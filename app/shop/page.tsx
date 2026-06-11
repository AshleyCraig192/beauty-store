export default function ShopPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Shop</h1>
      <p className="text-gray-600 mb-8">Browse our beauty products</p>

      {/* Product grid will go here */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div className="border border-gray-200 rounded-lg p-4 text-center text-gray-400">
          Products coming soon...
        </div>
      </div>
    </div>
  );
}