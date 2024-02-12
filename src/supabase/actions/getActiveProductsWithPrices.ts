import { createServerSupabaseClient } from "@/supabase/server";
import { ProductWithPrice } from "@/types/custom.types";

export default async function getActiveProductsWithPrices(): Promise<
  ProductWithPrice[]
> {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from("products")
    .select("*, prices(*)")
    .eq("active", true)
    .eq("prices.active", true)
    .order("metadata->index")
    .order("unit_amount", { foreignTable: "prices" });

  if (error) {
    console.error(error);
  }
  if (!data) {
    return [];
  }
  return data as ProductWithPrice[];
}
