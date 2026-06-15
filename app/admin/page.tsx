import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/roles";

export default async function AdminPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const adminUser = await isAdmin();
  if (!adminUser) {
    redirect("/");
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
      <p className="text-gray-600 mb-8">Manage your products and orders</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">Products</h2>
          <p className="text-gray-600 text-sm mb-4">Add, edit or remove products</p>
          <a href="/admin/products" className="text-sm bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800">
            Manage Products
          </a>
        </div>
        <div className="border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">Orders</h2>
          <p className="text-gray-600 text-sm mb-4">View and manage customer orders</p>
          <a href="/admin/orders" className="text-sm bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800">
            Manage Orders
          </a>
        </div>
      </div>
    </div>
  );
}