export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  sku: string;
  stockQuantity: number;
}

export interface OrderItemPayload {
  productId: string;
  quantity: number;
  price: number;
}

export interface CreateOrderPayload {
  customerId: string;
  totalAmount: number;
  items: OrderItemPayload[];
}

const CATALOG_API_BASE = process.env.NEXT_PUBLIC_CATALOG_API || "http://localhost:8081/api/v1";
const ORDER_API_BASE = process.env.NEXT_PUBLIC_ORDER_API || "http://localhost:8082/api/v1";

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch(`${CATALOG_API_BASE}/products`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function fetchProductsByCategory(category: string): Promise<Product[]> {
  const res = await fetch(`${CATALOG_API_BASE}/products/category/${category}`, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to fetch products for category: ${category}`);
  return res.json();
}

export async function createOrder(orderPayload: CreateOrderPayload) {
  const res = await fetch(`${ORDER_API_BASE}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderPayload),
  });
  if (!res.ok) throw new Error("Failed to place order");
  return res.json();
}