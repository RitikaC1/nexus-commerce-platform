import type { Metadata } from "next";
import { ShoppingCart, Store } from "lucide-react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nexus Commerce | Microservices Storefront",
  description: "Enterprise e-commerce platform powered by Spring Boot, Kafka, and Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900 antialiased min-h-screen flex flex-col">
        {/* Main Navigation Bar */}
        <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-xl text-slate-800">
              <Store className="w-6 h-6 text-brand-600" />
              <span>Nexus<span className="text-brand-600">Commerce</span></span>
            </div>
            
            <nav className="flex items-center gap-6">
              <span className="text-sm font-medium text-slate-600 hover:text-slate-900 cursor-pointer">
                Catalog
              </span>
              <span className="text-sm font-medium text-slate-600 hover:text-slate-900 cursor-pointer">
                Orders
              </span>
              <button className="relative p-2 text-slate-600 hover:text-brand-600 transition-colors">
                <ShoppingCart className="w-6 h-6" />
                <span className="absolute top-0 right-0 w-4 h-4 bg-brand-600 text-white text-[10px] font-bold rounded-full flex items-center justify-between justify-center">
                  0
                </span>
              </button>
            </nav>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500">
          <p>Nexus Commerce Platform — Spring Boot Microservices & Next.js</p>
        </footer>
      </body>
    </html>
  );
}