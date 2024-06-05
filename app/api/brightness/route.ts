// const brightness = require("brightness");
// // import brightness from "brightness";
// import { NextRequest, NextResponse } from "next/server";

// export async function GET(request: NextRequest) {
//   try {
//     const currentBrightness = await brightness.get();
//     return NextResponse.json({ messsage: currentBrightness });
//   } catch (error) {
//     console.log(error);

//     return NextResponse.json({ error: "Could not get brightness", er1: error });
//   }
// }

// export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import brightness from "brightness";

export async function GET(request: NextRequest) {
  const backlightPath = "/sys/class/backlight";

  if (!fs.existsSync(backlightPath)) {
    return NextResponse.json({ error: "Backlight directory not found. Brightness control not supported in this environment." });
  }

  try {
    const currentBrightness = await brightness.get();
    return NextResponse.json({ message: currentBrightness });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: "Could not get brightness", details: error.message });
  }
}

export const dynamic = "force-dynamic";
