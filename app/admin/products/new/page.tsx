import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/roles";
import NewProductForm from "@/components/NewProductForm";

export default async function NewProductPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const adminUser = await isAdmin();
  if (!adminUser) {
    redirect("/");
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Add Product</h1>
      <NewProductForm />
    </div>
  );
}