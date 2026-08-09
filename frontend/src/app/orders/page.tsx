import { ShoppingBag, Clock, CheckCircle2, AlertCircle } from "lucide-react";

export const revalidate = 0; // Fresh order data on every navigation

interface OrderItem {
  id: string;
  productId: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  customerId: string;
  totalAmount: number;
  status: string;
  createdAt: string;
  items: OrderItem[];
}

async function fetchCustomerOrders(customerId: string): Promise<Order[]> {
  const ORDER_API_BASE = process.env.NEXT_PUBLIC_ORDER_API || "http://localhost:8082/api/v1";
  const res = await fetch(`${ORDER_API_BASE}/orders/customer/${customerId}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch customer orders");
  return res.json();
}

export default async function OrdersPage() {
  const demoCustomerId = "cust-demo-101";
  let orders: Order[] = [];
  let error = null;

  try {
    orders = await fetchCustomerOrders(demoCustomerId);
  } catch (err) {
    console.error("Error fetching customer orders:", err);
    error = "Unable to connect to Order Service. Ensure order-service (Port 8082) is running.";
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-brand-600" />
            <span>Customer Order History</span>
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Viewing transactional orders for demo account: <code className="text-brand-600 font-mono">{demoCustomerId}</code>
          </p>
        </div>
        <span className="text-xs font-semibold px-3 py-1 bg-slate-100 text-slate-700 rounded-full">
          {orders.length} {orders.length === 1 ? "Order" : "Orders"} Placed
        </span>
      </div>

      {/* Error State */}
      {error && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 flex items-center gap-3 text-amber-800 text-sm font-medium">
          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Empty State */}
      {!error && orders.length === 0 && (
        <div className="bg-white border border-slate-200 rounded-xl p-12 text-center space-y-3">
          <Clock className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="font-semibold text-slate-700">No orders found</h3>
          <p className="text-sm text-slate-500 max-w-sm mx-auto">
            Head over to the Catalog page and click "Buy Now" on any product to trigger your first transactional order and Kafka event!
          </p>
        </div>
      )}

      {/* Orders List */}
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs text-slate-400 block uppercase font-bold tracking-wider">Order Reference</span>
                <span className="font-mono text-sm font-semibold text-slate-800">{order.id}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{order.status || "CONFIRMED"}</span>
                </span>
                <span className="text-lg font-bold text-slate-900">${order.totalAmount.toFixed(2)}</span>
              </div>
            </div>

            {/* Line Items */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Line Items</span>
              <div className="divide-y divide-slate-100 border border-slate-100 rounded-lg overflow-hidden">
                {order.items?.map((item) => (
                  <div key={item.id} className="p-3 bg-slate-50/50 flex items-center justify-between text-sm">
                    <span className="font-mono text-xs text-slate-600">Product ID: {item.productId}</span>
                    <span className="font-medium text-slate-800">Qty: {item.quantity} × ${item.price.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}