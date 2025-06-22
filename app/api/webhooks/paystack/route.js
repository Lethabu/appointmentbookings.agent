import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

export async function POST(req) {
    if (!process.env.PAYSTACK_WEBHOOK_SECRET) {
        console.error("PAYSTACK_WEBHOOK_SECRET is not set. Webhook cannot be verified.");
        return NextResponse.json({ error: "Webhook configuration error" }, { status: 500 });
    }

    const secret = process.env.PAYSTACK_WEBHOOK_SECRET;
    const rawBody = await req.text();
    const hash = crypto.createHmac('sha512', secret)
                       .update(rawBody)
                       .digest('hex');
    const paystackSignature = req.headers.get('x-paystack-signature');

    if (hash !== paystackSignature) {
        console.warn("Paystack webhook signature verification failed.");
        return NextResponse.json({ error: "Unauthorized - Invalid signature" }, { status: 401 });
    }

    const event = JSON.parse(rawBody);

    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    try {
        if (event.event === 'charge.success') {
            const { reference, status, id: paystackTransactionId, metadata, amount, currency } = event.data;
            const paymentDbId = metadata?.payment_db_id;
            const orderId = metadata?.order_id;

            if (!reference && !paymentDbId) {
                console.error("Webhook payload 'charge.success' missing reference or payment_db_id in metadata.");
                return NextResponse.json({ error: "Missing payment reference or ID" }, { status: 400 });
            }

            const paymentIdentifier = paymentDbId ? { id: paymentDbId } : { gateway_reference: reference };

            const { data: updatedPayment, error: paymentUpdateError } = await supabase
                .from('payments')
                .update({
                    status: 'completed',
                    transaction_id: paystackTransactionId,
                    processed_at: new Date().toISOString(),
                })
                .match(paymentIdentifier)
                .select()
                .single();

            if (paymentUpdateError || !updatedPayment) {
                console.error("Error updating payment status for Paystack charge.success or payment not found:", paymentUpdateError, "Reference/ID:", paymentIdentifier);
                return NextResponse.json({ error: "Failed to update payment status" }, { status: 500 });
            }

            if (orderId && updatedPayment) {
                const { error: orderUpdateError } = await supabase
                    .from('orders')
                    .update({ status: 'paid' })
                    .eq('id', orderId);

                if (orderUpdateError) {
                    console.error("Error updating order status for Paystack charge.success:", orderUpdateError, "Order ID:", orderId);
                } else {
                    console.log(`Order ${orderId} status updated to paid successfully.`);
                }
            } else if (!orderId && updatedPayment) {
                console.warn(`Payment ${updatedPayment.id} processed successfully, but no orderId found in metadata to update order status.`);
            }
        }
        // Handle other event types as needed
        return NextResponse.json({ received: true });

    } catch (error) {
        console.error('Paystack webhook processing failed:', error);
        return NextResponse.json({ error: 'Webhook processing error' }, { status: 500 });
    }
}
