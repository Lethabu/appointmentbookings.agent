import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(req) {
  const { payment_id, amount, return_url } = await req.json();

  if (!payment_id || !amount || !return_url) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  // TODO: Generate payment URL with Netcash or your payment provider
  const paymentUrl = `https://sandbox.netcash.co.za/payment/${payment_id}?amount=${amount}&return_url=${encodeURIComponent(return_url)}`;

  // Optionally update payment record in DB here

  return NextResponse.json({ url: paymentUrl });
}
