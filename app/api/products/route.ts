import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { name, description, price, stock, category, images } = body;

  if (!name || !description || !price || !category) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const product = await db.product.create({
    data: {
      name,
      description,
      price,
      stock,
      category,
      images: images ?? [],
    },
  });

  return NextResponse.json(product);
}

export async function GET() {
  const products = await db.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(products);
}