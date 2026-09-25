import React, { useEffect, useState } from 'react';
import { ArrowLeft, ClipboardList, MapPin, PackageCheck, Phone, RefreshCw, Truck } from 'lucide-react';
import { updateOrderPayment, updateOrderStatus, readOrders } from '../lib/productStore';
import { useToast } from '../context/ToastContext';

const statusLabels = {
  pending: 'New order',
  confirmed: 'Confirmed',
  processing: 'Preparing',
  ready_for_pickup: 'Ready for collection',
  out_for_delivery: 'Out for delivery',
  completed: 'Completed',
  cancelled: 'Cancelled',
};

const money = (amount) => `KES ${Number(amount || 0).toLocaleString('en-KE')}`;
const nextStatuses = (order) => {
  if (order.status === 'pending') return ['confirmed', 'cancelled'];
  if (order.status === 'confirmed') return ['processing', 'cancelled'];
  if (order.status === 'processing') return [order.fulfillment === 'pickup' ? 'ready_for_pickup' : 'out_for_delivery', 'cancelled'];
  if (['ready_for_pickup', 'out_for_delivery'].includes(order.status)) return ['completed', 'cancelled'];
  return [];
};

export default function OrderManagement() {
  const notify = useToast();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updatingId, setUpdatingId] = useState('');
  const [filter, setFilter] = useState('active');

  const refresh = () => {
    setLoading(true);
    setError('');
    readOrders().then(setOrders)
      .catch((loadError) => setError(loadError.message || 'Could not load orders.'))
      .finally(() => setLoading(false));
  };
  useEffect(() => { refresh(); }, []);

  const visibleOrders = orders.filter((order) => filter === 'all' || (filter === 'active' ? !['completed', 'cancelled'].includes(order.status) : order.status === filter));

  const changeStatus = async (order, status) => {
    setUpdatingId(order.id);
    setError('');
    try {
      await updateOrderStatus(order.id, status);
      await refresh();
      notify(`Order status updated to ${statusLabels[status] || status}.`);
    } catch (updateError) {
      setError(updateError.message || 'Could not update this order.');
      notify(updateError.message || 'Could not update this order.', 'error');
    } finally {
      setUpdatingId('');
    }
  };

  const markPaymentReceived = async (order) => {
    setUpdatingId(order.id);
    setError('');
    try {
      await updateOrderPayment(order.id, 'paid');
      refresh();
      notify('Payment marked as received.');
    } catch (updateError) {
      setError(updateError.message || 'Could not update payment status.');
      notify(updateError.message || 'Could not update payment status.', 'error');
    } finally {
      setUpdatingId('');
    }
  };

  return <section className="min-h-[80vh] bg-[#f6f7f9] px-4 pb-20 pt-28 sm:px-8 lg:px-12">
    <div className="mx-auto max-w-7xl">
      <a href="/admin/products" className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-brand-blue"><ArrowLeft className="h-4 w-4" /> Product management</a>
      <div className="mt-5 flex flex-col justify-between gap-5 border-b border-slate-200 pb-7 sm:flex-row sm:items-end">
        <div><p className="text-xs font-bold uppercase tracking-[.18em] text-brand-blue">Store operations</p><h1 className="mt-2 text-3xl font-heading font-bold tracking-tight text-brand-navy sm:text-5xl">Orders</h1><p className="mt-3 text-sm text-slate-600">Review incoming orders and coordinate stock, payment, and fulfillment.</p></div>
        <button type="button" onClick={refresh} disabled={loading} className="inline-flex items-center justify-center gap-2 self-start rounded-full border border-slate-200 bg-white px-4 py-3 text-xs font-semibold text-brand-navy transition hover:border-brand-blue hover:text-brand-blue disabled:opacity-50 sm:self-auto"><RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} /> Refresh orders</button>
      </div>

      <div className="mt-7 flex flex-wrap items-center gap-2">
        {[['active', 'Active'], ['pending', 'New'], ['all', 'All orders'], ['completed', 'Completed'], ['cancelled', 'Cancelled']].map(([value, label]) => <button key={value} type="button" onClick={() => setFilter(value)} className={`rounded-full px-4 py-2 text-xs font-semibold transition ${filter === value ? 'bg-brand-navy text-white' : 'bg-white text-slate-600 hover:bg-slate-100'}`}>{label}{value === 'pending' && <span className="ml-2 opacity-70">{orders.filter((order) => order.status === 'pending').length}</span>}</button>)}
      </div>

      {error && <p role="alert" className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
      {loading ? <div className="mt-8 grid min-h-48 place-items-center rounded-2xl bg-white text-sm text-slate-500" role="status">Loading orders…</div> : visibleOrders.length ? <div className="mt-5 space-y-4">
        {visibleOrders.map((order) => {
          const next = nextStatuses(order);
          return <article key={order.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <div className="flex flex-col justify-between gap-4 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:px-6">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <p className="font-heading text-sm font-bold text-brand-navy">{order.order_number}</p>
                <span className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wide ${order.status === 'pending' ? 'bg-amber-50 text-amber-800' : order.status === 'cancelled' ? 'bg-red-50 text-red-700' : order.status === 'completed' ? 'bg-emerald-50 text-emerald-800' : 'bg-blue-50 text-brand-blue'}`}>{statusLabels[order.status] || order.status}</span>
                <span className="text-xs text-slate-400">{new Date(`${order.created_at.replace(' ', 'T')}Z`).toLocaleString('en-KE', { dateStyle: 'medium', timeStyle: 'short' })}</span>
              </div>
              <strong className="font-heading text-lg text-brand-navy">{money(order.total)}</strong>
            </div>
            <div className="grid gap-6 px-5 py-5 sm:px-6 lg:grid-cols-[minmax(0,1fr)_260px]">
              <div>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm"><strong className="text-brand-navy">{order.customer_name}</strong><a href={`mailto:${order.customer_email}`} className="text-slate-600 hover:text-brand-blue">{order.customer_email}</a><a href={`tel:${order.customer_phone}`} className="inline-flex items-center gap-1.5 text-slate-600 hover:text-brand-blue"><Phone className="h-3.5 w-3.5" />{order.customer_phone}</a></div>
                <p className="mt-3 flex items-start gap-2 text-xs leading-relaxed text-slate-600"><span className="mt-0.5 text-brand-blue">{order.fulfillment === 'delivery' ? <Truck className="h-4 w-4" /> : <MapPin className="h-4 w-4" />}</span><span><strong className="text-slate-700">{order.fulfillment === 'delivery' ? 'Delivery' : 'Store collection'}</strong>{order.delivery_address ? ` · ${order.delivery_address}` : ''}</span></p>
                {order.customer_notes && <p className="mt-3 rounded-xl bg-slate-50 px-3 py-2 text-xs leading-relaxed text-slate-600">Note: {order.customer_notes}</p>}
                <div className="mt-5 divide-y divide-slate-100 border-y border-slate-100">
                  {order.items.map((item, index) => <div key={`${order.id}-${index}`} className="flex items-center gap-3 py-3">
                    <div className="grid h-12 w-14 shrink-0 place-items-center overflow-hidden rounded-lg bg-slate-50">{item.image_src ? <img src={item.image_src} alt="" className="h-full w-full object-contain p-1" /> : <PackageCheck className="h-4 w-4 text-slate-300" />}</div>
                    <div className="min-w-0 flex-1"><p className="truncate text-xs font-semibold text-brand-navy">{item.product_name}</p><p className="mt-0.5 text-[10px] text-slate-500">{item.category} · Qty {item.quantity}{item.sku ? ` · ${item.sku}` : ''}</p></div>
                    <span className="shrink-0 text-xs font-semibold text-slate-700">{money(item.unit_price * item.quantity)}</span>
                  </div>)}
                </div>
              </div>
              <aside className="flex flex-col justify-between gap-4 rounded-xl bg-slate-50 p-4">
                <div><p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Payment</p><p className="mt-1 text-xs font-semibold text-brand-navy">Arrange with customer</p><p className="mt-1 text-[11px] text-slate-500">{order.payment_status === 'paid' ? 'Payment received' : 'Awaiting payment'}</p>{order.payment_status !== 'paid' && order.status !== 'cancelled' && <button type="button" disabled={updatingId === order.id} onClick={() => markPaymentReceived(order)} className="mt-2 text-[10px] font-semibold text-brand-blue underline underline-offset-2 disabled:opacity-50">Mark payment received</button>}<div className="mt-4 border-t border-slate-200 pt-4"><p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Items total</p><p className="mt-1 font-heading text-lg font-bold text-brand-navy">{money(order.subtotal)}</p><p className="mt-1 text-[10px] text-slate-500">Delivery fee is confirmed separately.</p></div></div>
                {next.length > 0 && <label className="block text-[10px] font-semibold text-slate-600">Update order status<select value="" disabled={updatingId === order.id} onChange={(event) => event.target.value && changeStatus(order, event.target.value)} className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-xs font-semibold text-brand-navy outline-none focus:border-brand-blue"><option value="">{updatingId === order.id ? 'Updating…' : 'Choose next step'}</option>{next.map((status) => <option key={status} value={status}>{statusLabels[status]}</option>)}</select></label>}
              </aside>
            </div>
          </article>;
        })}
      </div> : <div className="mt-8 rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center"><ClipboardList className="mx-auto h-8 w-8 text-slate-300" /><h2 className="mt-4 font-heading text-lg font-bold text-brand-navy">{orders.length ? 'No orders in this view' : 'No orders yet'}</h2><p className="mt-2 text-sm text-slate-500">New customer orders will appear here.</p></div>}
    </div>
  </section>;
}
