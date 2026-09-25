// import { fetchProducts } from "@/lib/api";
// import ProductCard from "@/components/ProductCard";
// import { PackageSearch, RefreshCw } from "lucide-react";

// export const revalidate = 0; // Disable static caching for real-time catalog updates

// export default async function HomePage() {
//   /*let products = [];*/
//   let products: any[] = [];
//   let error = null;

//   try {
//     products = await fetchProducts();
//   } catch (err) {
//     console.error("Error fetching catalog products:", err);
//     error = "Unable to connect to Catalog Service. Ensure catalog-service (Port 8081) is running.";
//   }

//   return (
//     <div className="space-y-8">
//       {/* Hero Section */}
//       <section className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-2xl p-8 shadow-sm">
//         <div className="max-w-2xl space-y-3">
//           <span className="text-xs font-bold tracking-wider text-brand-500 uppercase">
//             Live Storefront Demo
//           </span>
//           <h1 className="text-3xl font-extrabold sm:text-4xl">
//             Event-Driven Microservices Commerce
//           </h1>
//           <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
//             Browse items powered by Spring Boot & PostgreSQL. Clicking "Buy Now" places a transactional order via <code className="text-brand-500">order-service</code> and broadcasts a real-time event through Apache Kafka.
//           </p>
//         </div>
//       </section>

//       {/* Catalog Grid Section */}
//       <section className="space-y-4">
//         <div className="flex items-center justify-between border-b border-slate-200 pb-4">
//           <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
//             <PackageSearch className="w-5 h-5 text-brand-600" />
//             <span>Product Catalog</span>
//           </h2>
//           <span className="text-xs font-semibold px-3 py-1 bg-slate-100 text-slate-600 rounded-full">
//             {products.length} Items Available
//           </span>
//         </div>

//         {error ? (
//           <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-center space-y-3">
//             <RefreshCw className="w-8 h-8 text-amber-600 mx-auto animate-spin" />
//             <p className="text-sm font-medium text-amber-800">{error}</p>
//           </div>
//         ) : products.length === 0 ? (
//           <div className="bg-white border border-slate-200 rounded-xl p-12 text-center text-slate-500">
//             No products found in the catalog. Seed products via catalog-service API!
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {products.map((product) => (
//               <ProductCard key={product.id} product={product} />
//             ))}
//           </div>
//         )}
//       </section>
//     </div>
//   );
// }





// 'use client';

// import { useState, useEffect } from 'react';
// import { Product } from '@/types/product';
// import { ProductCard } from '@/components/ProductCard';
// import { ProductSkeleton } from '@/components/ProductSkeleton';

// export default function CatalogPage() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [search, setSearch] = useState<string>('');
//   const [selectedCategory, setSelectedCategory] = useState<string>('All');

//   useEffect(() => {
//     // Replace with real API call to Spring Boot catalog-service when live
//     const fetchProducts = async () => {
//       try {
//         setLoading(true);
//         // Simulation delay
//         await new Promise((res) => setTimeout(res, 800));
        
//         setProducts([
//           {
//             id: '1',
//             name: 'Wireless Noise-Canceling Headphones',
//             description: 'Premium over-ear headphones with active noise cancellation and 30-hour battery life.',
//             price: 299.99,
//             sku: 'AUDIO-001',
//             category: 'Electronics',
//             stockQuantity: 15,
//           },
//           {
//             id: '2',
//             name: 'Ergonomic Mechanical Keyboard',
//             description: 'Custom hot-swappable mechanical keyboard with RGB backlighting and tactile switches.',
//             price: 149.50,
//             sku: 'PERIPH-002',
//             category: 'Electronics',
//             stockQuantity: 8,
//           },
//           {
//             id: '3',
//             name: 'Stainless Steel Water Bottle',
//             description: 'Double-wall vacuum insulated 32oz bottle keeping drinks cold for up to 24 hours.',
//             price: 34.99,
//             sku: 'GEAR-003',
//             category: 'Lifestyle',
//             stockQuantity: 0,
//           },
//           {
//             id: '4',
//             name: 'Minimalist Leather Wallet',
//             description: 'Slim RFID-blocking front pocket wallet crafted from full-grain leather.',
//             price: 45.00,
//             sku: 'ACC-004',
//             category: 'Lifestyle',
//             stockQuantity: 25,
//           },
//         ]);
//       } catch (err) {
//         console.error('Failed to load products', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   const categories = ['All', ...Array.from(new Set(products.map((p) => p.category)))];

//   const filteredProducts = products.filter((p) => {
//     const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
//                           p.description.toLowerCase().includes(search.toLowerCase());
//     const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
//     return matchesSearch && matchesCategory;
//   });

//   return (
//     <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
//         <div>
//           <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Product Catalog</h1>
//           <p className="text-gray-500 mt-1">Explore available products across Nexus Commerce platform.</p>
//         </div>

//         <div className="flex flex-col sm:flex-row gap-3">
//           <input
//             type="text"
//             placeholder="Search products..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           />

//           <select
//             value={selectedCategory}
//             onChange={(e) => setSelectedCategory(e.target.value)}
//             className="px-4 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           >
//             {categories.map((cat) => (
//               <option key={cat} value={cat}>{cat}</option>
//             ))}
//           </select>
//         </div>
//       </div>

//       {loading ? (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {Array.from({ length: 4 }).map((_, i) => (
//             <ProductSkeleton key={i} />
//           ))}
//         </div>
//       ) : filteredProducts.length === 0 ? (
//         <div className="text-center py-12 text-gray-500">
//           No products found matching your filter criteria.
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {filteredProducts.map((product) => (
//             <ProductCard
//               key={product.id}
//               product={product}
//               onAddToCart={(item) => alert(`Added ${item.name} to cart!`)}
//             />
//           ))}
//         </div>
//       )}
//     </main>
//   );
// }






import { fetchProducts } from "@/lib/api";
import { ProductCard } from "@/components/ProductCard";
import { PackageSearch, RefreshCw } from "lucide-react";
import { Product } from "@/types/product";

export const revalidate = 0; // Disable static caching for real-time catalog updates

export default async function CatalogPage() {
  let products: Product[] = [];
  let error: string | null = null;

  try {
    products = await fetchProducts();
  } catch (err) {
    error = "Failed to load catalog products. Please make sure the backend catalog-service is running.";
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
            Product Catalog
          </h1>
          <p className="text-gray-500 mt-1">
            Explore available items from our Nexus Commerce catalog service.
          </p>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-500">
          <RefreshCw className="w-4 h-4 animate-spin text-indigo-600" />
          <span>Real-time Sync Active</span>
        </div>
      </div>

      {error ? (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-6">
          {error}
        </div>
      ) : products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center border-2 border-dashed border-gray-200 rounded-xl">
          <PackageSearch className="w-12 h-12 text-gray-400 mb-3" />
          <h3 className="text-lg font-medium text-gray-900">No products found</h3>
          <p className="text-sm text-gray-500 max-w-sm mt-1">
            There are currently no products available in the database.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}