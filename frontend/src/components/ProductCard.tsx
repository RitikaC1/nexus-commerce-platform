// "use client";

// import { useState } from "react";
// import { Product, createOrder } from "@/lib/api";
// import { ShoppingBag, Check, Loader2 } from "lucide-react";

// interface ProductCardProps {
//   product: Product;
// }

// export default function ProductCard({ product }: ProductCardProps) {
//   const [loading, setLoading] = useState(false);
//   const [ordered, setOrdered] = useState(false);

//   const handleQuickPurchase = async () => {
//     try {
//       setLoading(true);
//       await createOrder({
//         customerId: "cust-demo-101",
//         totalAmount: product.price,
//         items: [
//           {
//             productId: product.id,
//             quantity: 1,
//             price: product.price,
//           },
//         ],
//       });
//       setOrdered(true);
//       setTimeout(() => setOrdered(false), 3000);
//     } catch (err) {
//       console.error("Failed to place order:", err);
//       alert("Order placement failed. Check if order-service is running.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden flex flex-col justify-between p-5">
//       <div>
//         <div className="flex items-center justify-between mb-3">
//           <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 uppercase tracking-wider">
//             {product.category}
//           </span>
//           <span
//             className={`text-xs font-medium px-2 py-0.5 rounded ${
//               product.stockQuantity > 0
//                 ? "bg-emerald-50 text-emerald-700"
//                 : "bg-amber-50 text-amber-700"
//             }`}
//           >
//             {product.stockQuantity > 0 ? `${product.stockQuantity} in stock` : "Low stock"}
//           </span>
//         </div>

//         <h3 className="font-bold text-lg text-slate-800 mb-1 line-clamp-1">
//           {product.name}
//         </h3>
//         <p className="text-sm text-slate-500 mb-4 line-clamp-2">
//           {product.description || "High-performance item engineered for optimal reliability."}
//         </p>
//       </div>

//       <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
//         <div>
//           <span className="text-xs text-slate-400 block">Price</span>
//           <span className="text-xl font-bold text-slate-900">
//             ${product.price.toFixed(2)}
//           </span>
//         </div>

//         <button
//           onClick={handleQuickPurchase}
//           disabled={loading}
//           className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
//             ordered
//               ? "bg-emerald-600 text-white"
//               : "bg-brand-600 hover:bg-brand-700 text-white active:scale-95"
//           }`}
//         >
//           {loading ? (
//             <Loader2 className="w-4 h-4 animate-spin" />
//           ) : ordered ? (
//             <>
//               <Check className="w-4 h-4" />
//               <span>Ordered!</span>
//             </>
//           ) : (
//             <>
//               <ShoppingBag className="w-4 h-4" />
//               <span>Buy Now</span>
//             </>
//           )}
//         </button>
//       </div>
//     </div>
//   );
// }






import React from 'react';
import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="flex flex-col border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white">
      <div className="h-48 w-full bg-gray-100 flex items-center justify-center text-gray-400 font-medium">
        {product.imageUrl ? (
          <img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover" />
        ) : (
          <span>{product.category}</span>
        )}
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 mb-1">
          {product.category}
        </span>
        <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1">{product.name}</h3>
        <p className="text-sm text-gray-600 line-clamp-2 mb-4 flex-grow">{product.description}</p>
        
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
          <span className="text-xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
          <button
            onClick={() => onAddToCart && onAddToCart(product)}
            disabled={product.stockQuantity === 0}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              product.stockQuantity > 0
                ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {product.stockQuantity > 0 ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </div>
  );
};