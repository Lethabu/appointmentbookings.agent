import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Dummy signature verification - replace with real implementation!
function verifySignature(payload, signature, secret) {
  if (process.env.NODE_ENV !== 'production' && signature === 'dummy-signature-for-dev') {
    return true;
  }
  return false;
}

export async function POST(req) {
  let payload;
  try {
    payload = await req.json();
  } catch (e) {
    return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
  }
  const signature = req.headers.get('x-netcash-signature');

  if (!process.env.NETCASH_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Webhook configuration error" }, { status: 500 });
  }

  if (!verifySignature(payload, signature, process.env.NETCASH_WEBHOOK_SECRET)) {
    return NextResponse.json({ error: "Unauthorized - Invalid signature" }, { status: 401 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  const { payment_id, status, transaction_id } = payload;

  if (!payment_id) {
    return NextResponse.json({ error: "Missing payment_id" }, { status: 400 });
  }

  // Update payment status
  await supabase
    .from('payments')
    .update({
      status: status === 'success' ? 'completed' : 'failed',
      transaction_id: transaction_id,
      processed_at: new Date().toISOString()
    })
    .eq('id', payment_id);

  // Update order status if payment successful
  if (status === 'success') {
    const { data: payment } = await supabase
      .from('payments')
      .select('order_id')
      .eq('id', payment_id)
      .single();

    if (payment && payment.order_id) {
      await supabase
        .from('orders')
        .update({ status: 'paid' })
        .eq('id', payment.order_id);
    }
  }

  return NextResponse.json({ received: true });
}
