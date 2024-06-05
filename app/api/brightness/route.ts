const brightness = require("brightness");
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Get current brightness
    const currentBrightness = await brightness.get();
    return NextResponse.json({ messsage: currentBrightness });
  } catch (error) {
    return NextResponse.json({ error: "Could not get brightness" });
  }
}
