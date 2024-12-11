import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient("https://ecvdkfcjqvwvkvxpspak.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVjdmRrZmNqcXZ3dmt2eHBzcGFrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMyMDg3MzAsImV4cCI6MjA0ODc4NDczMH0._EmTEMzf8aH2tLi-YlUW9CwT_cSmXrZh9sghSakrRDg");