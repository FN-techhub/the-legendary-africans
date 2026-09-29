import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "../../../lib/supabaseAdmin";

export async function POST(request: NextRequest) {
  const body = await request.json();

  console.log("M-Pesa callback received:", JSON.stringify(body, null, 2));

  const callback = body.Body?.stkCallback;

  if (!callback) {
    return NextResponse.json({ ResultCode: 0, ResultDesc: "Accepted" });
  }

  const resultCode = callback.ResultCode;
  const checkoutRequestId = callback.CheckoutRequestID;

  if (!checkoutRequestId) {
    console.log("No CheckoutRequestID in callback, ignoring.");
    return NextResponse.json({ ResultCode: 0, ResultDesc: "Accepted" });
  }

  if (resultCode === 0) {
    const receiptItem = callback.CallbackMetadata?.Item?.find(
      (item: any) => item.Name === "MpesaReceiptNumber"
    );
    const mpesaReceipt = receiptItem?.Value;

    await supabaseAdmin
      .from("orders")
      .update({
        payment_status: "paid",
        order_status: "processing",
      })
      .eq("checkout_request_id", checkoutRequestId);

    console.log("Payment successful, receipt:", mpesaReceipt);
  } else {
    await supabaseAdmin
      .from("orders")
      .update({ payment_status: "failed" })
      .eq("checkout_request_id", checkoutRequestId);

    console.log("Payment failed or cancelled, ResultCode:", resultCode);
  }

  return NextResponse.json({ ResultCode: 0, ResultDesc: "Accepted" });
}