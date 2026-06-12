import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import EditProductForm from "@/components/EditProductForm";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = await db.product.findUnique({
    where: { id },
  });

  if (!product) {
    notFound();
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Edit Product</h1>
      <EditProductForm product={product} />
    </div>
  );
}