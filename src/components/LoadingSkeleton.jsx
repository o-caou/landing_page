export default function LoadingSkeleton() {
  return (
    <div className="p-6 space-y-6 animate-pulse">
      {/* Skeleton for Header */}
      <div className="h-12 bg-gray-200 rounded w-1/4 mx-auto"></div>

      {/* Skeleton for Main Banner */}
      <div className="bg-gray-200 h-96 rounded-md"></div>

      {/* Skeleton for Product Title */}
      <div className="h-8 bg-gray-200 rounded w-2/4 mx-auto"></div>

      {/* Skeleton for Product Images */}
      <div className="grid grid-cols-3 gap-4">
        <div className="h-40 bg-gray-200 rounded"></div>
        <div className="h-40 bg-gray-200 rounded"></div>
        <div className="h-40 bg-gray-200 rounded"></div>
      </div>

      {/* Skeleton for Product Description */}
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded w-4/6"></div>
      </div>

      {/* Skeleton for Footer */}
      <div className="h-10 bg-gray-200 rounded w-1/4 mx-auto mt-12"></div>
    </div>
  );
}
