import { createServerSupabaseClient } from "@/supabase/utils/server";
import { ProductWithPrice } from "@/types/custom.types";

export async function getActiveProductsWithPrices(): Promise<
  ProductWithPrice[]
> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("products")
    .select("*, prices(*)")
    .eq("active", true)
    .eq("prices.active", true)
    .order("metadata->index")
    .order("unit_amount", { referencedTable: "prices" });

  if (error) {
    console.error(error);
  }
  if (!data) {
    return [];
  }
  return data as ProductWithPrice[];
}
