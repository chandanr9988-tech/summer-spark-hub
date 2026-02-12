import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          {
            role: "system",
            content: `You are a friendly and helpful Summer Camp assistant chatbot. You help parents and kids learn about our summer camp programs. Here are our camps:

- **Upskilling** (₹2,500): Leadership, communication, time management for ages 8-16, 10 days
- **SplashFun** (₹2,500): Swimming, water polo, splash games for ages 6-14, 10 days
- **Chill & Vibe** (₹2,500): Music, yoga, outdoor games for ages 7-15, 10 days
- **Handwriting Mastery** (₹1,000): Cursive writing, calligraphy for ages 5-12, 10 days
- **Generative AI** (₹1,000): AI art, prompt engineering, chatbot building for ages 10-16, 10 days
- **Art & Crafts** (₹500): Painting, origami, clay modeling for ages 5-12, 10 days
- **Public Speaking** (₹1,000): Debates, storytelling, presentations for ages 8-16, 10 days
- **Combo Pack** (₹3,000): ALL activities included for ages 6-16, 10 days - BEST VALUE!

Be enthusiastic, helpful, and encourage parents to register. Answer questions about schedules, safety, pricing, and activities. Keep responses concise and friendly.`,
          },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again shortly." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Service temporarily unavailable." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
