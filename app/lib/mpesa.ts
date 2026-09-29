const MPESA_BASE_URL =
  process.env.MPESA_ENV === "production"
    ? "https://api.safaricom.co.ke"
    : "https://sandbox.safaricom.co.ke";

export async function getMpesaAccessToken(): Promise<string> {
  const consumerKey = process.env.MPESA_CONSUMER_KEY;
  const consumerSecret = process.env.MPESA_CONSUMER_SECRET;

  if (!consumerKey || !consumerSecret) {
    throw new Error("Missing M-Pesa Consumer Key or Secret in environment variables.");
  }

  const credentials = Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64");

  const response = await fetch(
    `${MPESA_BASE_URL}/oauth/v1/generate?grant_type=client_credentials`,
    {
      method: "GET",
      headers: {
        Authorization: `Basic ${credentials}`,
      },
      cache: "no-store",
    }
  );

  const rawText = await response.text();

  if (!response.ok) {
    console.error("M-Pesa Token Error Status:", response.status, rawText);
    throw new Error(`Failed to retrieve M-Pesa access token: ${response.statusText}`);
  }

  try {
    const data = JSON.parse(rawText);
    if (!data.access_token) {
      throw new Error("No access_token field returned in response.");
    }
    return data.access_token;
  } catch (err) {
    console.error("Failed to parse M-Pesa token response JSON:", rawText);
    throw new Error("Invalid response format received from Safaricom OAuth API.");
  }
}

export function generateMpesaPassword() {
  const shortcode = process.env.MPESA_SHORTCODE;
  const passkey = process.env.MPESA_PASSKEY;

  if (!shortcode || !passkey) {
    throw new Error("Missing M-Pesa Shortcode or Passkey in environment variables.");
  }

  const now = new Date();
  const formatter = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Africa/Nairobi",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  const parts = formatter.formatToParts(now);
  const getPart = (type: string) => parts.find((p) => p.type === type)?.value || "";

  const year = getPart("year");
  const month = getPart("month");
  const day = getPart("day");
  const hour = getPart("hour");
  const minute = getPart("minute");
  const second = getPart("second");

  const timestamp = `${year}${month}${day}${hour}${minute}${second}`;

  const password = Buffer.from(`${shortcode}${passkey}${timestamp}`).toString("base64");

  return { password, timestamp, shortcode };
}

export async function initiateSTKPush({
  phoneNumber,
  amount,
  orderId,
}: {
  phoneNumber: string;
  amount: number;
  orderId: string;
}) {
  const accessToken = await getMpesaAccessToken();
  const { password, timestamp, shortcode } = generateMpesaPassword();

  let formattedPhone = phoneNumber.replace(/\s+/g, "").replace(/^\+/, "");
  if (formattedPhone.startsWith("0")) {
    formattedPhone = `254${formattedPhone.slice(1)}`;
  }

  const callbackUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/api/mpesa/callback`;

  const response = await fetch(`${MPESA_BASE_URL}/mpesa/stkpush/v1/processrequest`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
    body: JSON.stringify({
      BusinessShortCode: shortcode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: Math.round(amount),
      PartyA: formattedPhone,
      PartyB: shortcode,
      PhoneNumber: formattedPhone,
      CallBackURL: callbackUrl,
      AccountReference: orderId.slice(0, 12),
      TransactionDesc: "TLA Purchase",
    }),
  });

  const data = await response.json();
  return data;
}
