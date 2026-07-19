import { NextRequest, NextResponse } from "next/server";
import { generateJSON } from "@/lib/groq/client";
import { INCIDENT_SUMMARY_PROMPT } from "@/lib/gemini/prompts";
import { formatDateTime } from "@/lib/utils/format";

export const runtime = "edge";
export const maxDuration = 30;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, severity, location_name, description } = body as {
      type: string;
      severity: string;
      location_name: string;
      description: string;
    };

    const prompt = INCIDENT_SUMMARY_PROMPT({
      type: type.replace(/_/g, " "),
      severity,
      location: location_name,
      description,
      time: formatDateTime(new Date()),
    });

    const summary = await generateJSON<{
      summary: string;
      immediate_actions: string[];
      nearest_resources: string[];
      estimated_resolution: string;
      communication_message: string;
      priority_score: number;
      recommended_team: string;
    }>(prompt);

    return NextResponse.json(summary);
  } catch (error) {
    console.error("Incident summary error:", error);

    // Fallback
    return NextResponse.json({
      summary: "Incident reported and response protocols initiated. Emergency teams are being notified.",
      immediate_actions: [
        "Notify nearest security staff",
        "Alert medical team if required",
        "Clear immediate area",
      ],
      nearest_resources: ["First Aid Station", "Security Office"],
      estimated_resolution: "15-30 minutes",
      communication_message: "We are aware of a situation in this area and our team is responding. Please remain calm.",
      priority_score: 5,
      recommended_team: "Security",
    });
  }
}
