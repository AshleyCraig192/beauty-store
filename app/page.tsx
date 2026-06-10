import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-pink-50 py-24 px-6 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Discover Your Beauty
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
          Premium beauty products delivered straight to your door.
        </p>
        <Link
          href="/shop"
          className="bg-black text-white px-8 py-3 rounded-md text-sm font-medium hover:bg-gray-800"
        >
          Shop Now
        </Link>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 max-w-5xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6">
            <div className="text-3xl mb-4">✨</div>
            <h3 className="font-semibold text-gray-900 mb-2">Premium Quality</h3>
            <p className="text-sm text-gray-600">
              Carefully selected beauty products for every skin type.
            </p>
          </div>
          <div className="p-6">
            <div className="text-3xl mb-4">🚚</div>
            <h3 className="font-semibold text-gray-900 mb-2">Fast Delivery</h3>
            <p className="text-sm text-gray-600">
              Same day courier booking on all confirmed orders.
            </p>
          </div>
          <div className="p-6">
            <div className="text-3xl mb-4">🔒</div>
            <h3 className="font-semibold text-gray-900 mb-2">Secure Payments</h3>
            <p className="text-sm text-gray-600">
              Safe and encrypted checkout powered by Stripe.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}