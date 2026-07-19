// Deno Supabase Edge Function: incident-summary
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
    const { type, severity } = await req.json()

    // Determine priority score and actions
    let priorityScore = 5
    let recommendedTeam = "Operations Team"
    let immediateActions = ["Inform nearest supervisor", "Log incident details"]

    if (severity === "critical" || severity === "high") {
      priorityScore = 9
      immediateActions = ["Dispatch emergency response immediately", "Clear surrounding corridor space"]
      recommendedTeam = type.includes("medical") ? "Medical Team Alpha" : "Security Team B"
    }

    const response = {
      summary: `AI analyzed ${severity} severity incident reported. Dispatching ${recommendedTeam}.`,
      priority_score: priorityScore,
      recommended_team: recommendedTeam,
      immediate_actions: immediateActions,
      estimated_resolution: "15 minutes",
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
