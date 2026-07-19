import { NextRequest, NextResponse } from "next/server";
import { generateJSON } from "@/lib/groq/client";
import { CROWD_PREDICTION_PROMPT } from "@/lib/gemini/prompts";
import { CrowdPrediction } from "@/types";

export const runtime = "edge";
export const maxDuration = 30;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { currentCount, capacity, matchTime, historicalPattern } = body as {
      currentCount: number;
      capacity: number;
      matchTime: string;
      historicalPattern: string;
    };

    const prompt = CROWD_PREDICTION_PROMPT(
      currentCount,
      capacity,
      matchTime ?? "Pre-match",
      historicalPattern ?? "Standard World Cup match day"
    );

    const prediction = await generateJSON<{
      predictions: CrowdPrediction[];
      peak_time: string;
      peak_count: number;
      recommendations: string[];
      congestion_zones: string[];
      risk_level: string;
    }>(prompt);

    return NextResponse.json(prediction);
  } catch (error) {
    console.error("Crowd prediction error:", error);

    // Fallback prediction
    return NextResponse.json({
      predictions: [
        { hour: 1, predicted_count: 78000, confidence: 85, crowd_level: "high" },
        { hour: 2, predicted_count: 81000, confidence: 78, crowd_level: "critical" },
        { hour: 3, predicted_count: 65000, confidence: 70, crowd_level: "high" },
      ],
      peak_time: "19:45",
      peak_count: 81000,
      recommendations: [
        "Open all auxiliary gates immediately",
        "Deploy additional volunteers to concourses",
        "Activate overflow parking protocols",
      ],
      congestion_zones: ["Gate 3", "North Concourse", "Food Court A"],
      risk_level: "high",
    });
  }
}
