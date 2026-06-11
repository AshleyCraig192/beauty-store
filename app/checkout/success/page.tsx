import Link from "next/link";

export default function CheckoutSuccessPage() {
  return (
    <div className="max-w-xl mx-auto px-6 py-24 text-center">
      <div className="text-5xl mb-6">✅</div>
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Confirmed!</h1>
      <p className="text-gray-600 mb-8">
        Thank you for your order. We will process your payment and book a courier to deliver your products shortly.
      </p>
      <Link
        href="/shop"
        className="bg-black text-white px-6 py-3 rounded-md text-sm hover:bg-gray-800"
      >
        Continue Shopping
      </Link>
    </div>
  );
}