import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-03-25.dahlia",
});

type CartItem = {
  name: string;
  price: number;
  quantity: number;
};

export async function POST(req: NextRequest) {
  try {
    const { items, shipping } = await req.json() as { items: CartItem[]; shipping: number };

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map((item) => ({
      price_data: {
        currency: "jpy",
        product_data: { name: item.name },
        unit_amount: item.price,
      },
      quantity: item.quantity,
    }));

    if (shipping > 0) {
      lineItems.push({
        price_data: {
          currency: "jpy",
          product_data: { name: "送料" },
          unit_amount: shipping,
        },
        quantity: 1,
      });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout`,
      locale: "ja",
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
