// export interface Product {
//   id: string;
//   name: string;
//   description: string;
//   price: number;
//   category: string;
//   sku: string;
//   stockQuantity: number;
// }

// export interface OrderItemPayload {
//   productId: string;
//   quantity: number;
//   price: number;
// }

// export interface CreateOrderPayload {
//   customerId: string;
//   totalAmount: number;
//   items: OrderItemPayload[];
// }

// const CATALOG_API_BASE = process.env.NEXT_PUBLIC_CATALOG_API || "http://localhost:8081/api/v1";
// const ORDER_API_BASE = process.env.NEXT_PUBLIC_ORDER_API || "http://localhost:8082/api/v1";

// export async function fetchProducts(): Promise<Product[]> {
//   const res = await fetch(`${CATALOG_API_BASE}/products`, { cache: "no-store" });
//   if (!res.ok) throw new Error("Failed to fetch products");
//   return res.json();
// }

// export async function fetchProductsByCategory(category: string): Promise<Product[]> {
//   const res = await fetch(`${CATALOG_API_BASE}/products/category/${category}`, { cache: "no-store" });
//   if (!res.ok) throw new Error(`Failed to fetch products for category: ${category}`);
//   return res.json();
// }

// export async function createOrder(orderPayload: CreateOrderPayload) {
//   const res = await fetch(`${ORDER_API_BASE}/orders`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(orderPayload),
//   });
//   if (!res.ok) throw new Error("Failed to place order");
//   return res.json();
// }


import { Product } from "@/types/product";

const CATALOG_API_URL = process.env.NEXT_PUBLIC_CATALOG_API_URL || "http://localhost:8081/api/products";

export async function fetchProducts(): Promise<Product[]> {
  try {
    const response = await fetch(CATALOG_API_URL, {
      cache: "no-store", // Ensure fresh data on every request
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch catalog: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching products from catalog-service:", error);
    throw error;
  }
}

export async function fetchProductById(id: string): Promise<Product | null> {
  try {
    const response = await fetch(`${CATALOG_API_URL}/${id}`, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error(`Failed to fetch product ${id}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    throw error;
  }
}

