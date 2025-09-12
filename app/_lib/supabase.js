import { createClient } from "@supabase/supabase-js";
console.log("ENV URL:", process.env.SUPABASE_URL);
console.log("ENV NEXT_PUBLIC_URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);
export default supabase;
