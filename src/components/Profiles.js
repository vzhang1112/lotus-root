import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient("https://ecvdkfcjqvwvkvxpspak.supabase.co");