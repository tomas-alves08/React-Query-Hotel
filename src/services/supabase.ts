import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://qspuuapdorddzvkjuhlp.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFzcHV1YXBkb3JkZHp2a2p1aGxwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYyNzY1OTMsImV4cCI6MjAzMTg1MjU5M30.X3QU1tSdO80DyvV4MudyQcGq_p91DpyMz9YwmeIU5Zg";
const supabase = createClient(supabaseUrl, supabaseKey || "");

export default supabase;
