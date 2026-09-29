import { NextRequest, NextResponse } from "next/server";
import { initiateSTKPush } from "../../../lib/mpesa";
import { supabaseAdmin } from "../../../lib/supabaseAdmin";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { phoneNumber, orderId } = body;

  if (!phoneNumber || !orderId) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const { data: order, error: fetchError } = await supabaseAdmin
    .from("orders")
    .select("total_amount")
    .eq("id", orderId)
    .single();

  if (fetchError || !order) {
    return NextResponse.json(
      { error: "Order not found" },
      { status: 404 }
    );
  }

  try {
    const result = await initiateSTKPush({
      phoneNumber,
      amount: order.total_amount,
      orderId,
    });

       if (result.ResponseCode === "0") {
      await supabaseAdmin
        .from("orders")
        .update({
          payment_status: "processing",
          checkout_request_id: result.CheckoutRequestID,
        })
        .eq("id", orderId);

      return NextResponse.json({
        success: true,
        checkoutRequestId: result.CheckoutRequestID,
      });
    } else {
      return NextResponse.json(
        { success: false, error: result.errorMessage || "STK push failed" },
        { status: 400 }
      );
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Something went wrong initiating payment" },
      { status: 500 }
    );
  }
}