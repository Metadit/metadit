import { createClient } from "@supabase/supabase-js";

const api_url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const api_key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
export const supabase = createClient(api_url as string, api_key as string);
