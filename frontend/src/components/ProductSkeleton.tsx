import React from 'react';

export const ProductSkeleton: React.FC = () => {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm bg-white animate-pulse">
      <div className="h-48 bg-gray-200" />
      <div className="p-4 space-y-3">
        <div className="h-3 bg-gray-200 rounded w-1/4" />
        <div className="h-5 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-2/3" />
        <div className="pt-2 border-t border-gray-100 flex justify-between items-center">
          <div className="h-6 bg-gray-200 rounded w-1/3" />
          <div className="h-8 bg-gray-200 rounded w-1/4" />
        </div>
      </div>
    </div>
  );
};