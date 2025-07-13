// /app/api/verify-payment/route.js
import { NextResponse } from 'next/server';

export async function POST(req) {
    const { reference } = await req.json();

    if (!reference) {
        return NextResponse.json({ status: 'error', message: 'Missing reference' }, { status: 400 });
    }

    try {
        const secretKey = process.env.NEXT_PUBLIC_PAYSTACK_SK;

        const verifyRes = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${secretKey}`,
                'Content-Type': 'application/json',
            },
        });

        const data = await verifyRes.json();

        if (data.status && data.data.status === 'success') {
            // You can save the order to DB here too
            return NextResponse.json({ status: 'success', data: data.data });
        } else {
            return NextResponse.json({ status: 'failed', data: data.data }, { status: 400 });
        }

    } catch (err) {
        console.error('Paystack verification error:', err);
        return NextResponse.json({ status: 'error', message: 'Server error' }, { status: 500 });
    }
}
