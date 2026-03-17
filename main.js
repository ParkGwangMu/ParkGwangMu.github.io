import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";
import { supabaseConfig } from "./supabase-config.js";

const form = document.getElementById("contact-form");
const status = document.getElementById("status");

const hasConfig =
  supabaseConfig.url &&
  supabaseConfig.url !== "YOUR_SUPABASE_URL" &&
  supabaseConfig.anonKey &&
  supabaseConfig.anonKey !== "YOUR_SUPABASE_ANON_KEY";

const supabase = hasConfig
  ? createClient(supabaseConfig.url, supabaseConfig.anonKey)
  : null;

const setStatus = (message, type = "info") => {
  status.textContent = message;
  status.dataset.state = type;
};

if (!supabase) {
  setStatus("Add your Supabase URL and anon key in supabase-config.js.", "warning");
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!supabase) {
    setStatus("Supabase config is missing. Fill in supabase-config.js first.", "error");
    return;
  }

  const formData = new FormData(form);
  const payload = {
    name: String(formData.get("name") || "").trim(),
    email: String(formData.get("email") || "").trim() || null,
    message: String(formData.get("message") || "").trim(),
  };

  if (!payload.name || !payload.message) {
    setStatus("Name and message are required.", "error");
    return;
  }

  setStatus("Sending...", "info");

  const { error } = await supabase.from("site_messages").insert(payload);

  if (error) {
    setStatus(`Save failed: ${error.message}`, "error");
    return;
  }

  form.reset();
  setStatus("Message saved to Supabase.", "success");
});
