import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";
import { headers } from "next/headers";

export async function POST(req: Request) {
  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature")!;

  let event;

try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error("Webhook signature error:", err.message);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as any;

    const userId = session.metadata?.userId;
    const shippingAddress = session.metadata?.shippingAddress
      ? JSON.parse(session.metadata.shippingAddress)
      : {};

    // Make sure user exists in our database
    await db.user.upsert({
      where: { clerkId: userId },
      update: {},
      create: {
        clerkId: userId,
        email: session.customer_details?.email ?? "",
        name: session.customer_details?.name ?? "",
      },
    });

    const user = await db.user.findUnique({
      where: { clerkId: userId },
    });

    await db.order.create({
      data: {
        userId: user!.id,
        status: "paid",
        totalAmount: session.amount_total / 100,
        stripePaymentId: session.payment_intent,
        shippingAddress,
        orderItems: {
          create: [],
        },
      },
    });
  }

  return NextResponse.json({ received: true });
}