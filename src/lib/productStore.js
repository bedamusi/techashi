async function request(url, options = {}) {
  const response = await fetch(url, { credentials: 'include', ...options });
  const payload = response.headers.get('content-type')?.includes('application/json')
    ? await response.json()
    : null;
  if (!response.ok) throw new Error(payload?.error || 'The product service is temporarily unavailable.');
  return payload;
}

let csrfToken = '';
export function setCsrfToken(value) { csrfToken = value || ''; }

function writeHeaders(extra = {}) {
  if (!csrfToken) throw new Error('Your admin session expired. Sign in again.');
  return { 'X-CSRF-Token': csrfToken, ...extra };
}

async function ensureCsrfToken() {
  if (csrfToken) return csrfToken;
  const { csrfToken: token } = await request('/api/index.php?route=session');
  setCsrfToken(token);
  return token;
}

export async function readProducts(category = 'all') {
  const params = new URLSearchParams({ route: 'products', category });
  const { products } = await request(`/api/index.php?${params}`);
  return products || [];
}

export async function readProduct(id, category) {
  const params = new URLSearchParams({ route: 'products', id, category });
  const { product } = await request(`/api/index.php?${params}`);
  return product;
}

export async function saveProduct(product) {
  const editing = Boolean(product.id);
  return request('/api/index.php?route=products', {
    method: editing ? 'PUT' : 'POST',
    headers: writeHeaders({ 'Content-Type': 'application/json' }),
    body: JSON.stringify(product),
  });
}

export async function deleteProduct(id) {
  const params = new URLSearchParams({ route: 'products', id });
  return request(`/api/index.php?${params}`, { method: 'DELETE', headers: writeHeaders() });
}

export async function uploadProductImages(files) {
  const form = new FormData();
  Array.from(files).forEach((file) => form.append('images[]', file));
  const { images } = await request('/api/index.php?route=upload', {
    method: 'POST',
    headers: writeHeaders(),
    body: form,
  });
  return images || [];
}

export async function placeOrder(order) {
  await ensureCsrfToken();
  return request('/api/index.php?route=orders', {
    method: 'POST',
    headers: writeHeaders({ 'Content-Type': 'application/json' }),
    body: JSON.stringify(order),
  }).then((result) => result.order);
}

export async function readOrders() {
  const { orders } = await request('/api/index.php?route=orders', { cache: 'no-store' });
  return orders || [];
}

export async function updateOrderStatus(id, status) {
  return request(`/api/index.php?route=orders&id=${encodeURIComponent(id)}`, {
    method: 'PATCH',
    headers: writeHeaders({ 'Content-Type': 'application/json' }),
    body: JSON.stringify({ status }),
  });
}

export async function updateOrderPayment(id, paymentStatus) {
  return request(`/api/index.php?route=orders&id=${encodeURIComponent(id)}`, {
    method: 'PATCH',
    headers: writeHeaders({ 'Content-Type': 'application/json' }),
    body: JSON.stringify({ paymentStatus }),
  });
}
