import { PostDataProps, Price } from "@/types/custom.types";

export function getURL() {
  let url = process.env.NEXT_PUBLIC_VERCEL_URL ?? "http://localhost:3000/";

  url = url.includes("http") ? url : `https://${url}`;
  url = url.charAt(url.length - 1) === "/" ? url : `${url}/`;
  return url;
}

export async function postData({ url, data }: PostDataProps) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin",
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  } catch (err) {
    console.error("Error in POST", { url, data, err });
  }
}

export function toDateTime(secs: number) {
  const time = new Date("1970-01-01T00:30:00Z");
  time.setSeconds(secs);
  return time;
}

export function formatPrice(price: Price) {
  const priceString = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: price.currency || "EUR",
    minimumFractionDigits: 0,
  }).format((price.unit_amount || 0) / 100);

  return priceString;
}

export function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  const formatDate = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "full",
  }).format(date);

  return formatDate;
}
