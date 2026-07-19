// Deno Supabase Edge Function: translate
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { text, targetLanguage } = await req.json()
    const groqApiKey = Deno.env.get('GROQ_API_KEY')

    if (!groqApiKey) {
      // Local fallbacks for offline demo purposes
      let translation = `[${targetLanguage}] ${text}`
      if (targetLanguage === "Spanish" && text.includes("exit")) {
        translation = "Por favor, diríjase a la salida más cercana de manera ordenada."
      }

      return new Response(
        JSON.stringify({ translation }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${groqApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'user', content: `Translate the following text to ${targetLanguage} accurately without adding any conversational commentary. Text: "${text}"` }
        ],
        temperature: 0.3
      })
    })

    const data = await response.json()
    const translation = data.choices?.[0]?.message?.content?.trim() ?? `[${targetLanguage}] ${text}`

    return new Response(
      JSON.stringify({ translation }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
