import { fetchProducts } from "@/lib/api";
import ProductCard from "@/components/ProductCard";
import { PackageSearch, RefreshCw } from "lucide-react";

export const revalidate = 0; // Disable static caching for real-time catalog updates

export default async function HomePage() {
  /*let products = [];*/
  let products: any[] = [];
  let error = null;

  try {
    products = await fetchProducts();
  } catch (err) {
    console.error("Error fetching catalog products:", err);
    error = "Unable to connect to Catalog Service. Ensure catalog-service (Port 8081) is running.";
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-2xl p-8 shadow-sm">
        <div className="max-w-2xl space-y-3">
          <span className="text-xs font-bold tracking-wider text-brand-500 uppercase">
            Live Storefront Demo
          </span>
          <h1 className="text-3xl font-extrabold sm:text-4xl">
            Event-Driven Microservices Commerce
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Browse items powered by Spring Boot & PostgreSQL. Clicking "Buy Now" places a transactional order via <code className="text-brand-500">order-service</code> and broadcasts a real-time event through Apache Kafka.
          </p>
        </div>
      </section>

      {/* Catalog Grid Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <PackageSearch className="w-5 h-5 text-brand-600" />
            <span>Product Catalog</span>
          </h2>
          <span className="text-xs font-semibold px-3 py-1 bg-slate-100 text-slate-600 rounded-full">
            {products.length} Items Available
          </span>
        </div>

        {error ? (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-center space-y-3">
            <RefreshCw className="w-8 h-8 text-amber-600 mx-auto animate-spin" />
            <p className="text-sm font-medium text-amber-800">{error}</p>
          </div>
        ) : products.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-xl p-12 text-center text-slate-500">
            No products found in the catalog. Seed products via catalog-service API!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}