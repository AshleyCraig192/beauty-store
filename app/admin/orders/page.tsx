import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import UpdateOrderStatus from "@/components/UpdateOrderStatus";
import { isAdmin } from "@/lib/roles";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const adminUser = await isAdmin();
  if (!adminUser) {
    redirect("/");
  }

  const orders = await db.order.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: true,
    },
  });

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Orders</h1>
      <p className="text-gray-600 mb-8">Manage customer orders</p>

      {orders.length === 0 ? (
        <div className="text-center py-24 border border-dashed border-gray-200 rounded-lg">
          <p className="text-gray-400">No orders yet</p>
        </div>
      ) : (
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 text-gray-600">Order ID</th>
                <th className="text-left px-4 py-3 text-gray-600">Customer</th>
                <th className="text-left px-4 py-3 text-gray-600">Amount</th>
                <th className="text-left px-4 py-3 text-gray-600">Status</th>
                <th className="text-left px-4 py-3 text-gray-600">Date</th>
                <th className="text-left px-4 py-3 text-gray-600">Shipping Address</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-gray-100">
                  <td className="px-4 py-3 font-mono text-xs">{order.id.slice(0, 8)}...</td>
                  <td className="px-4 py-3">{order.user.email}</td>
                  <td className="px-4 py-3">R{order.totalAmount.toFixed(2)}</td>
                  <td className="px-4 py-3">
                    <UpdateOrderStatus
                      orderId={order.id}
                      currentStatus={order.status}
                    />
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-xs">
                    {(order.shippingAddress as any)?.street}, {(order.shippingAddress as any)?.city}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}