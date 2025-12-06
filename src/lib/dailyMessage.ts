import { supabase } from "@/utils/supabaseClient";

export async function getDailyMessage() {
  try {
    const today = new Date().toISOString().split("T")[0];

    const { data, error } = await supabase
      .from("daily_messages")
      .select("*")
      .eq("date", today)
      .single();

    if (error) {
      console.error("Error fetching daily message:", error.message);
      return null;
    }

    return data ?? null;
  } catch (err) {
    console.error("Unexpected error in getDailyMessage:", err);
    return null;
  }
}
