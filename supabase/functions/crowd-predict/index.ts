// Deno Supabase Edge Function: crowd-predict
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
    const { currentCount, capacity } = await req.json()

    // Simple mathematical model for crowd prediction flow
    const fillRate = currentCount / capacity
    const isHighRisk = fillRate >= 0.85

    const response = {
      predictions: [
        { hour: 1, predicted_count: Math.min(capacity, Math.round(currentCount * 1.05)), confidence: 90 },
        { hour: 2, predicted_count: Math.min(capacity, Math.round(currentCount * 1.10)), confidence: 85 },
      ],
      peak_count: Math.min(capacity, Math.round(currentCount * 1.12)),
      peak_time: "In 2 hours",
      risk_level: isHighRisk ? "high" : "normal",
      recommendations: isHighRisk 
        ? ["Open auxiliary entry gates 10 and 12", "Send mobile alerts directing fans to Gate 1"] 
        : ["Continue standard gate operations"],
    }

    return new Response(
      JSON.stringify(response),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
