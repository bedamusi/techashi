import React, { useEffect, useMemo, useState } from 'react';
import { Archive, ClipboardList, FileDown, ImagePlus, LogOut, PackagePlus, Pencil, Plus, Search, Trash2, Upload, X } from 'lucide-react';
import { PRODUCT_CATEGORIES } from '../data/techashiData';
import { deleteProduct as deleteCatalogProduct, readProducts, saveProduct as saveCatalogProduct, uploadProductImages } from '../lib/productStore';
import { signOutAdmin } from '../lib/adminAuth';
import { useToast } from '../context/ToastContext';

const blankProduct = { name: '', category: 'laptops', description: '', price: '', specs: '', sku: '', stock: '', images: [] };

function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = '';
  let quoted = false;
  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    if (quoted) {
      if (char === '"' && text[index + 1] === '"') { cell += '"'; index += 1; }
      else if (char === '"') quoted = false;
      else cell += char;
    } else if (char === '"' && cell === '') quoted = true;
    else if (char === ',') { row.push(cell.trim()); cell = ''; }
    else if (char === '\n' || char === '\r') {
      if (char === '\r' && text[index + 1] === '\n') index += 1;
      row.push(cell.trim());
      if (row.some(Boolean)) rows.push(row);
      row = []; cell = '';
    } else cell += char;
  }
  if (quoted) throw new Error('The CSV has an unclosed quoted field.');
  row.push(cell.trim());
  if (row.some(Boolean)) rows.push(row);
  if (rows.length < 2) throw new Error('Add a header row and at least one product row.');

  const headers = rows[0].map((header) => header.toLowerCase().replace(/^\uFEFF/, ''));
  const required = ['name', 'category', 'description', 'price', 'specs'];
  const missing = required.filter((header) => !headers.includes(header));
  if (missing.length) throw new Error(`Missing required CSV columns: ${missing.join(', ')}.`);
  const knownCategories = PRODUCT_CATEGORIES.map(({ id }) => id);

  return rows.slice(1).map((cells, index) => {
    const value = (key) => cells[headers.indexOf(key)] || '';
    const product = {
      name: value('name'), category: value('category').toLowerCase(), description: value('description'),
      price: Number(value('price')), specs: value('specs').split(/[|;]/).map((spec) => spec.trim()).filter(Boolean),
      sku: value('sku'), stock: value('stock') === '' ? null : Number(value('stock')), images: [],
    };
    const issues = [];
    if (!product.name || product.name.length > 100) issues.push('name is required (max 100 characters)');
    if (!knownCategories.includes(product.category)) issues.push(`category must be one of: ${knownCategories.join(', ')}`);
    if (!product.description || product.description.length > 700) issues.push('description is required (max 700 characters)');
    if (!Number.isFinite(product.price) || product.price < 0) issues.push('price must be a non-negative number');
    if (!product.specs.length) issues.push('at least one spec is required');
    if (product.sku.length > 40) issues.push('SKU must be 40 characters or fewer');
    if (product.stock !== null && (!Number.isInteger(product.stock) || product.stock < 0)) issues.push('stock must be blank or a non-negative whole number');
    return { line: index + 2, product, issues };
  });
}

const CSV_TEMPLATE = 'name,category,description,price,specs,sku,stock\n"Dell Latitude 5440",laptops,"Core i5 laptop with 16 GB RAM",85000,"Core i5 | 16 GB RAM | 512 GB SSD",TECH-001,5\n';

export default function ProductManagement() {
  const notify = useToast();
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(blankProduct);
  const [editingId, setEditingId] = useState(null);
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [bulkRows, setBulkRows] = useState([]);
  const [bulkError, setBulkError] = useState('');
  const [bulkBusy, setBulkBusy] = useState(false);

  const refreshProducts = async () => {
    setIsLoading(true);
    try { setProducts(await readProducts()); }
    catch { setError('Could not load the shared catalog. Check that the PHP API and MySQL database are running.'); }
    finally { setIsLoading(false); }
  };
  useEffect(() => { refreshProducts(); }, []);

  const visibleProducts = useMemo(() => products.filter((product) =>
    (filter === 'all' || product.category === filter) &&
    `${product.name} ${product.description} ${product.sku}`.toLowerCase().includes(query.toLowerCase())
  ), [products, filter, query]);

  const updateForm = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  const chooseCsv = async (event) => {
    const file = event.target.files?.[0];
    setBulkError('');
    setBulkRows([]);
    if (!file) return;
    try {
      if (!/\.csv$/i.test(file.name)) throw new Error('Choose a .csv file.');
      if (file.size > 2 * 1024 * 1024) throw new Error('CSV files must be 2 MB or smaller.');
      setBulkRows(parseCsv(await file.text()));
    } catch (parseError) {
      setBulkError(parseError.message || 'Could not read this CSV file.');
    }
    event.target.value = '';
  };

  const importCsv = async () => {
    const validRows = bulkRows.filter(({ issues }) => !issues.length);
    if (!validRows.length) return;
    setBulkBusy(true);
    const failures = [];
    let imported = 0;
    for (const row of validRows) {
      try { await saveCatalogProduct(row.product); imported += 1; }
      catch (importError) { failures.push(`Row ${row.line}: ${importError.message || 'save failed'}`); }
    }
    await refreshProducts();
    setBulkBusy(false);
    if (failures.length) {
      setBulkError(`${imported} imported; ${failures.length} failed. ${failures.slice(0, 3).join(' ')}`);
      if (imported) notify(`${imported} product${imported === 1 ? '' : 's'} imported; ${failures.length} failed.`, 'error');
    } else {
      notify(`${imported} product${imported === 1 ? '' : 's'} imported successfully.`);
      setBulkRows([]);
    }
  };

  const onChooseImages = async (event) => {
    setError('');
    setIsUploading(true);
    try {
      const incoming = await uploadProductImages(event.target.files);
      setForm((current) => ({ ...current, images: [...current.images, ...incoming].slice(0, 5) }));
    } catch (uploadError) {
      setError(uploadError.message || 'Image upload failed.');
    }
    setIsUploading(false);
    event.target.value = '';
  };

  const clearForm = () => {
    setForm(blankProduct);
    setEditingId(null);
    setError('');
  };

  const saveProduct = async (event) => {
    event.preventDefault();
    setError('');
    if (!form.name.trim() || !form.description.trim() || !form.price || !form.specs.trim()) {
      setError('Add a product name, description, price, and at least one specification.');
      return;
    }
    const price = Number(form.price);
    const stock = form.stock === '' ? null : Number(form.stock);
    if (!Number.isFinite(price) || price < 0 || (stock !== null && (!Number.isInteger(stock) || stock < 0))) {
      setError('Enter a valid non-negative price and whole-number stock quantity.');
      return;
    }

    setIsSaving(true);
    const wasEditing = Boolean(editingId);
    const product = {
      ...(editingId ? { id: editingId } : {}),
      name: form.name.trim(),
      category: form.category,
      description: form.description.trim(),
      price,
      specs: form.specs.split('\n').map((item) => item.trim()).filter(Boolean),
      sku: form.sku.trim(),
      stock,
      images: form.images,
      updatedAt: new Date().toISOString(),
    };

    try {
      await saveCatalogProduct(product);
      await refreshProducts();
      clearForm();
      notify(wasEditing ? 'Product updated.' : 'Product added to the shared catalog.');
    } catch (saveError) {
      setError(saveError.message || 'Could not save the product. Check the connection and admin permissions.');
    } finally {
      setIsSaving(false);
    }
  };

  const editProduct = (product) => {
    setEditingId(product.id);
    setForm({
      name: product.name,
      category: product.category,
      description: product.description,
      price: String(product.price),
      specs: (product.specs || []).join('\n'),
      sku: product.sku || '',
      stock: product.stock == null ? '' : String(product.stock),
      images: product.images || [],
    });
    setError('');
    document.getElementById('product-editor')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const removeProduct = async (id) => {
    const productToRemove = products.find((product) => product.id === id);
    if (!window.confirm(`Remove ${productToRemove?.name || 'this product'} from the catalog?`)) return;
    try {
      await deleteCatalogProduct(id);
      await refreshProducts();
      notify('Product removed from the catalog.');
      if (editingId === id) clearForm();
    } catch (removeError) {
      setError(removeError.message || 'Could not update the shared catalog.');
    }
  };

  return (
    <section className="min-h-[80vh] bg-[#f6f7f9] px-4 pb-20 pt-28 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 border-b border-slate-200 pb-8 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-blue">Catalog workspace</p>
            <h1 className="mt-3 text-3xl font-heading font-bold tracking-tight text-brand-navy sm:text-5xl">Product management</h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600">Create and maintain the products shown in your customer catalog.</p>
          </div>
          <div className="flex items-center gap-4">
            <a href="/admin/orders" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-3 text-xs font-semibold text-brand-navy transition hover:border-brand-blue hover:text-brand-blue"><ClipboardList className="h-4 w-4" /><span className="hidden sm:inline">Orders</span></a>
            <a href="/admin/accounts" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-3 text-xs font-semibold text-brand-navy transition hover:border-brand-blue hover:text-brand-blue"><Plus className="h-4 w-4" /><span className="hidden sm:inline">Create account</span></a>
            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-3">
              <Archive className="h-5 w-5 text-brand-blue" />
              <div><p className="text-xl font-bold text-brand-navy">{products.length}</p><p className="text-[10px] uppercase tracking-wider text-slate-500">Products</p></div>
            </div>
            <button onClick={async () => { await signOutAdmin(); window.location.replace('/admin/login'); }} className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-3 text-xs font-semibold text-slate-600 transition hover:border-brand-blue hover:text-brand-blue"><LogOut className="h-4 w-4" />Sign out</button>
          </div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(320px,.65fr)] lg:items-start">
          <section className="order-2 lg:order-1">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-heading font-bold text-brand-navy">Catalog</h2>
                <p className="mt-1 text-xs text-slate-500">{visibleProducts.length} shown · saved products appear on the Products page</p>
              </div>
              <label className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5">
                <Search className="h-4 w-4 text-slate-400" />
                <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search products" className="w-full bg-transparent text-xs outline-none sm:w-40" />
              </label>
            </div>

            <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div><h3 className="text-sm font-heading font-bold text-brand-navy">Bulk upload products</h3><p className="mt-1 text-xs text-slate-500">Import a CSV, review the rows, then add them to the catalog.</p></div>
                <a href={`data:text/csv;charset=utf-8,${encodeURIComponent(CSV_TEMPLATE)}`} download="techashi-products-template.csv" className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3.5 py-2 text-[11px] font-semibold text-brand-navy hover:border-brand-blue hover:text-brand-blue"><FileDown className="h-4 w-4" /> Download template</a>
              </div>
              <label className="mt-4 flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-3 text-xs font-semibold text-slate-600 transition hover:border-brand-blue hover:text-brand-blue"><Upload className="h-4 w-4" /> Choose CSV file<input type="file" accept=".csv,text/csv" className="sr-only" onChange={chooseCsv} /></label>
              <p className="mt-2 text-[10px] leading-relaxed text-slate-400">Required columns: name, category, description, price, specs. Optional: sku, stock. Separate multiple specs with | or ;. Images can be added after import.</p>
              {bulkError && <p role="alert" className="mt-3 rounded-xl bg-red-50 px-3 py-2.5 text-xs text-red-700">{bulkError}</p>}
              {!!bulkRows.length && <>
                <div className="mt-4 max-h-60 overflow-auto rounded-xl border border-slate-200">
                  <table className="w-full min-w-[560px] text-left text-[11px]"><thead className="sticky top-0 bg-slate-50 text-slate-500"><tr><th className="px-3 py-2">Row</th><th className="px-3 py-2">Product</th><th className="px-3 py-2">Category</th><th className="px-3 py-2">Price</th><th className="px-3 py-2">Validation</th></tr></thead><tbody className="divide-y divide-slate-100">{bulkRows.map(({ line, product, issues }) => <tr key={line} className={issues.length ? 'bg-red-50/70' : ''}><td className="px-3 py-2 text-slate-400">{line}</td><td className="px-3 py-2 font-semibold text-brand-navy">{product.name || '—'}</td><td className="px-3 py-2">{product.category || '—'}</td><td className="px-3 py-2">{Number.isFinite(product.price) ? `KES ${product.price.toLocaleString()}` : '—'}</td><td className={`px-3 py-2 ${issues.length ? 'text-red-700' : 'text-emerald-700'}`}>{issues.length ? issues.join('; ') : 'Ready'}</td></tr>)}</tbody></table>
                </div>
                <div className="mt-3 flex flex-wrap items-center justify-between gap-3"><p className="text-xs text-slate-500">{bulkRows.filter(({ issues }) => !issues.length).length} ready · {bulkRows.filter(({ issues }) => issues.length).length} with errors</p><div className="flex gap-2"><button type="button" onClick={() => { setBulkRows([]); setBulkError(''); }} disabled={bulkBusy} className="rounded-full px-4 py-2 text-xs font-semibold text-slate-500 hover:bg-slate-100">Clear</button><button type="button" onClick={importCsv} disabled={bulkBusy || !bulkRows.some(({ issues }) => !issues.length)} className="inline-flex items-center gap-2 rounded-full bg-brand-navy px-4 py-2 text-xs font-semibold text-white hover:bg-brand-blue disabled:cursor-not-allowed disabled:opacity-50"><Upload className="h-3.5 w-3.5" />{bulkBusy ? 'Importing…' : 'Import valid products'}</button></div></div>
              </>}
            </div>

            <div className="mt-5 flex gap-2 overflow-x-auto pb-2">
              {['all', ...PRODUCT_CATEGORIES.map((item) => item.id)].map((category) => (
                <button key={category} onClick={() => setFilter(category)} className={`shrink-0 rounded-full px-4 py-2 text-[11px] font-semibold transition-colors ${filter === category ? 'bg-brand-navy text-white' : 'bg-white text-slate-600 hover:bg-slate-100'}`}>
                  {category === 'all' ? 'All products' : PRODUCT_CATEGORIES.find((item) => item.id === category)?.name}
                </button>
              ))}
            </div>

            {isLoading ? <div className="mt-5 rounded-2xl border border-slate-200 bg-white px-6 py-14 text-center text-sm text-slate-500" role="status">Loading shared catalog…</div> : visibleProducts.length ? (
              <div className="mt-4 divide-y divide-slate-200 border-y border-slate-200">
                {visibleProducts.map((product) => (
                  <article key={product.id} className="flex gap-4 py-4 sm:gap-5">
                    <div className="h-24 w-28 shrink-0 overflow-hidden rounded-xl bg-white sm:h-28 sm:w-36">
                      {product.images?.[0]?.src ? <img src={product.images[0].src} alt={product.images[0].name || product.name} className="h-full w-full object-contain p-2" /> : <div className="grid h-full place-items-center text-slate-300"><Archive className="h-7 w-7" /></div>}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-brand-blue">{PRODUCT_CATEGORIES.find((item) => item.id === product.category)?.name}</p>
                      <h3 className="mt-1 truncate font-heading font-bold text-brand-navy">{product.name}</h3>
                      <p className="mt-1 line-clamp-2 text-xs text-slate-500">{product.description}</p>
                      <p className="mt-2 text-xs font-bold text-slate-700">KES {Number(product.price).toLocaleString()}{product.stock != null ? ` · ${product.stock} in stock` : ''}</p>
                    </div>
                    <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                      <button onClick={() => editProduct(product)} aria-label={`Edit ${product.name}`} className="grid h-9 w-9 place-items-center rounded-full bg-white text-slate-500 hover:text-brand-blue"><Pencil className="h-4 w-4" /></button>
                      <button onClick={() => removeProduct(product.id)} aria-label={`Remove ${product.name}`} className="grid h-9 w-9 place-items-center rounded-full bg-white text-slate-500 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="mt-5 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
                <PackagePlus className="mx-auto h-8 w-8 text-slate-300" />
                <h3 className="mt-4 font-heading font-bold text-brand-navy">{products.length ? 'No matching products' : 'Your catalog is ready'}</h3>
                <p className="mx-auto mt-2 max-w-sm text-xs leading-relaxed text-slate-500">{products.length ? 'Try a different search or category.' : 'Add your first product to make it available in customer listings.'}</p>
                {!products.length && <button onClick={() => document.getElementById('product-editor')?.scrollIntoView({ behavior: 'smooth' })} className="mt-5 inline-flex items-center gap-2 rounded-full bg-brand-navy px-5 py-2.5 text-xs font-semibold text-white"><Plus className="h-4 w-4" /> Add first product</button>}
              </div>
            )}
          </section>

          <section id="product-editor" className="order-1 scroll-mt-28 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7 lg:sticky lg:top-28 lg:order-2">
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-5">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand-blue">Product details</p>
                <h2 className="mt-1 text-xl font-heading font-bold text-brand-navy">{editingId ? 'Edit product' : 'Add a product'}</h2>
              </div>
              {editingId && <button onClick={clearForm} aria-label="Cancel editing" className="rounded-full p-2 text-slate-400 hover:bg-slate-100"><X className="h-4 w-4" /></button>}
            </div>

            <form onSubmit={saveProduct} className="mt-5 space-y-4">
              <label className="block text-xs font-semibold text-slate-700">Product name *<input required maxLength={100} value={form.name} onChange={(event) => updateForm('name', event.target.value)} placeholder="e.g. Dell Latitude 5440" className="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-3 text-sm font-normal outline-none transition focus:border-brand-blue" /></label>
              <div className="grid grid-cols-2 gap-3">
                <label className="block text-xs font-semibold text-slate-700">Category *<select value={form.category} onChange={(event) => updateForm('category', event.target.value)} className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-xs font-normal outline-none focus:border-brand-blue">{PRODUCT_CATEGORIES.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}</select></label>
                <label className="block text-xs font-semibold text-slate-700">Price (KES) *<input required type="number" min="0" step="1" value={form.price} onChange={(event) => updateForm('price', event.target.value)} placeholder="0" className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-3 text-xs font-normal outline-none focus:border-brand-blue" /></label>
              </div>
              <label className="block text-xs font-semibold text-slate-700">Description *<textarea required maxLength={700} rows={3} value={form.description} onChange={(event) => updateForm('description', event.target.value)} placeholder="Describe condition, intended use, and key benefits" className="mt-1.5 w-full resize-y rounded-xl border border-slate-200 px-3.5 py-3 text-sm font-normal outline-none focus:border-brand-blue" /></label>
              <label className="block text-xs font-semibold text-slate-700">Specifications *<textarea required rows={3} value={form.specs} onChange={(event) => updateForm('specs', event.target.value)} placeholder={'One specification per line\nCore i5 · 16 GB RAM\n512 GB SSD'} className="mt-1.5 w-full resize-y rounded-xl border border-slate-200 px-3.5 py-3 text-sm font-normal outline-none focus:border-brand-blue" /></label>
              <div className="grid grid-cols-2 gap-3">
                <label className="block text-xs font-semibold text-slate-700">SKU <span className="font-normal text-slate-400">(optional)</span><input maxLength={40} value={form.sku} onChange={(event) => updateForm('sku', event.target.value)} placeholder="TECH-001" className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-3 text-xs font-normal outline-none focus:border-brand-blue" /></label>
                <label className="block text-xs font-semibold text-slate-700">Stock <span className="font-normal text-slate-400">(optional)</span><input type="number" min="0" step="1" value={form.stock} onChange={(event) => updateForm('stock', event.target.value)} placeholder="Not tracked" className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-3 text-xs font-normal outline-none focus:border-brand-blue" /></label>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between"><p className="text-xs font-semibold text-slate-700">Product images</p><span className="text-[10px] text-slate-400">Up to 5 · 5 MB each</span></div>
                <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-4 text-xs font-semibold text-slate-600 transition hover:border-brand-blue hover:text-brand-blue"><ImagePlus className="h-4 w-4" /> {isUploading ? 'Uploading images…' : 'Choose images'}<input type="file" accept="image/*" multiple disabled={isUploading || form.images.length >= 5} className="sr-only" onChange={onChooseImages} /></label>
                {!!form.images.length && <div className="mt-3 grid grid-cols-5 gap-2">{form.images.map((image, index) => <div key={`${image.name}-${index}`} className="relative aspect-square overflow-hidden rounded-lg bg-slate-50"><img src={image.src} alt={image.name} className="h-full w-full object-contain p-1" /><button type="button" onClick={() => updateForm('images', form.images.filter((_, imageIndex) => imageIndex !== index))} aria-label={`Remove ${image.name}`} className="absolute right-1 top-1 rounded-full bg-white/90 p-1 text-slate-500"><X className="h-3 w-3" /></button></div>)}</div>}
              </div>

              {error && <p role="alert" className="rounded-xl bg-red-50 px-3 py-2.5 text-xs text-red-700">{error}</p>}
              <button disabled={isSaving || isUploading} className="flex w-full items-center justify-center gap-2 rounded-full bg-brand-navy px-5 py-3.5 text-xs font-bold text-white transition hover:bg-brand-blue disabled:cursor-wait disabled:opacity-60"><Plus className="h-4 w-4" />{isSaving ? 'Saving…' : editingId ? 'Save changes' : 'Add product'}</button>
              <p className="text-center text-[10px] leading-relaxed text-slate-400">Products and images are saved to the shared MySQL catalog.</p>
            </form>
          </section>
        </div>
      </div>
    </section>
  );
}
