import { NextResponse, } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export async function POST(req) {
  const { data } = await req.json();
  const { amount } = data;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Number(amount) * 100,
      currency: "USD",
      payment_method_types: ['card'],
      setup_future_usage: 'off_session',
      statement_descriptor: 'FindX Subscription',
    });

    return new NextResponse(paymentIntent, { status: 200 });
  } catch (error) {
    return new NextResponse(error, {
      status: 400,
    });
  }
}