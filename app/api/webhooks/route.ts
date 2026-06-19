import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";
import { headers } from "next/headers";
import { resend } from "@/lib/resend";

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

    const order = await db.order.create({
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

    const customerEmail = session.customer_details?.email;
    const customerName = session.customer_details?.name ?? "Customer";
    const orderTotal = `R${(session.amount_total / 100).toFixed(2)}`;
    const orderId = order.id.slice(0, 8).toUpperCase();
    const street = shippingAddress?.street ?? "";
    const city = shippingAddress?.city ?? "";
    const province = shippingAddress?.province ?? "";
    const postalCode = shippingAddress?.postalCode ?? "";

    // Email to customer
    if (customerEmail) {
      await resend.emails.send({
        from: "Litsy Global Beauty <onboarding@resend.dev>",
        to: customerEmail,
        subject: `Order Confirmed — #${orderId}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
            <div style="background: #f5ede6; padding: 32px; text-align: center;">
              <h1 style="font-size: 24px; margin: 0;">Litsy Global Beauty</h1>
            </div>
            <div style="padding: 32px;">
              <h2 style="font-size: 18px;">Thank you for your order, ${customerName}!</h2>
              <p style="color: #8c7b6e; font-size: 14px;">Your order has been confirmed and is being processed.</p>
              
              <div style="background: #fdf6ee; padding: 16px; margin: 24px 0; border-left: 3px solid #e8c4b8;">
                <p style="margin: 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #8c7b6e;">Order Number</p>
                <p style="margin: 4px 0 0; font-size: 18px; font-weight: bold;">#${orderId}</p>
              </div>

              <div style="margin: 24px 0;">
                <p style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #8c7b6e;">Order Total</p>
                <p style="font-size: 18px; font-weight: bold;">${orderTotal}</p>
              </div>

              <div style="margin: 24px 0;">
                <p style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #8c7b6e;">Shipping To</p>
                <p style="font-size: 14px; margin: 4px 0;">${street}</p>
                <p style="font-size: 14px; margin: 4px 0;">${city}, ${province}, ${postalCode}</p>
              </div>

              <p style="color: #8c7b6e; font-size: 13px;">A courier will be booked to deliver your order. You will receive tracking information shortly.</p>
              
              <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #f0e6dc; text-align: center;">
                <p style="font-size: 11px; color: #8c7b6e; letter-spacing: 0.1em; text-transform: uppercase;">Love the skin you're in</p>
                <p style="font-size: 11px; color: #8c7b6e;">Litsy Global Beauty</p>
              </div>
            </div>
          </div>
        `,
      });
    }

    // Email to owner
    await resend.emails.send({
      from: "Litsy Orders <onboarding@resend.dev>",
      to: process.env.OWNER_EMAIL!,
      subject: `New Order — #${orderId} — ${orderTotal}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
          <div style="background: #1a1a1a; padding: 32px; text-align: center;">
            <h1 style="font-size: 24px; margin: 0; color: #f5ede6;">New Order Received</h1>
          </div>
          <div style="padding: 32px;">
            <div style="background: #fdf6ee; padding: 16px; margin-bottom: 24px; border-left: 3px solid #e8c4b8;">
              <p style="margin: 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #8c7b6e;">Order Number</p>
              <p style="margin: 4px 0 0; font-size: 18px; font-weight: bold;">#${orderId}</p>
            </div>

            <div style="margin: 16px 0;">
              <p style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #8c7b6e;">Customer</p>
              <p style="font-size: 14px; margin: 4px 0;">${customerName}</p>
              <p style="font-size: 14px; margin: 4px 0; color: #8c7b6e;">${customerEmail}</p>
            </div>

            <div style="margin: 16px 0;">
              <p style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #8c7b6e;">Order Total</p>
              <p style="font-size: 18px; font-weight: bold;">${orderTotal}</p>
            </div>

            <div style="margin: 16px 0;">
              <p style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #8c7b6e;">Deliver To</p>
              <p style="font-size: 14px; margin: 4px 0;">${customerName}</p>
              <p style="font-size: 14px; margin: 4px 0;">${street}</p>
              <p style="font-size: 14px; margin: 4px 0;">${city}, ${province}, ${postalCode}</p>
            </div>

            <div style="margin-top: 32px; padding: 16px; background: #f5ede6; border-radius: 4px;">
              <p style="margin: 0; font-size: 13px; color: #8c7b6e;">Please pack and book a courier for this order as soon as possible.</p>
            </div>
          </div>
        </div>
      `,
    });
  }

  return NextResponse.json({ received: true });
}