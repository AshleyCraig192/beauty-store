import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AccountPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const user = await db.user.findUnique({
    where: { clerkId: userId },
    include: {
      orders: {
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!user) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-24 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">My Orders</h1>
        <p className="text-gray-500">No orders found. Start shopping!</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">My Orders</h1>
      <p className="text-gray-600 mb-8">View your order history</p>

      {user.orders.length === 0 ? (
        <div className="text-center py-24 border border-dashed border-gray-200 rounded-lg">
          <p className="text-gray-400">You haven't placed any orders yet</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {user.orders.map((order) => (
            <div
              key={order.id}
              className="border border-gray-200 rounded-lg p-6"
            >
              <div className="flex items-center justify-between mb-2">
                <p className="font-mono text-xs text-gray-500">
                  Order #{order.id.slice(0, 8)}
                </p>
                <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                  {order.status}
                </span>
              </div>
              <p className="font-semibold text-gray-900 mb-1">
                R{order.totalAmount.toFixed(2)}
              </p>
              <p className="text-sm text-gray-500">
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
              <div className="mt-3 text-sm text-gray-500">
                <p>Shipping to: {(order.shippingAddress as any)?.street}, {(order.shippingAddress as any)?.city}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}