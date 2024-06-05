const brightness = require("brightness");
// import brightness from "brightness";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const currentBrightness = await brightness.get();
    return NextResponse.json({ messsage: currentBrightness });
  } catch (error) {
    console.log(error);

    return NextResponse.json({ error: "Could not get brightness", er1: error });
  }
}

export const dynamic = "force-dynamic";
