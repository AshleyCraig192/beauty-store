import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import Link from "next/link";

export const dynamic = "force-dynamic";
export default async function AdminProductsPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const products = await db.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600 mt-1">Manage your product catalog</p>
        </div>
        <Link
          href="/admin/products/new"
          className="bg-black text-white px-4 py-2 rounded-md text-sm hover:bg-gray-800"
        >
          Add Product
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-24 border border-dashed border-gray-200 rounded-lg">
          <p className="text-gray-400 mb-4">No products yet</p>
          <Link
            href="/admin/products/new"
            className="text-sm bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
          >
            Add your first product
          </Link>
        </div>
      ) : (
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 text-gray-600">Name</th>
                <th className="text-left px-4 py-3 text-gray-600">Category</th>
                <th className="text-left px-4 py-3 text-gray-600">Price</th>
                <th className="text-left px-4 py-3 text-gray-600">Stock</th>
                <th className="text-left px-4 py-3 text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-gray-100">
                  <td className="px-4 py-3 font-medium">{product.name}</td>
                  <td className="px-4 py-3 text-gray-600">{product.category}</td>
                  <td className="px-4 py-3">R{product.price.toFixed(2)}</td>
                  <td className="px-4 py-3">{product.stock}</td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/products/${product.id}/edit`}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </Link>
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