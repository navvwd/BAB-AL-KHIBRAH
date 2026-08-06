import { NextResponse } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";

export async function GET() {
  try {
    const filePath = join(process.cwd(), "bbk-brchr.pdf");
    const fileBuffer = readFileSync(filePath);

    const response = new NextResponse(fileBuffer, { status: 200 });
    response.headers.set("Content-Type", "application/pdf");
    response.headers.set(
      "Content-Disposition",
      "attachment; filename=\"Bab-Al-Khibrah-Brochure.pdf\"; filename*=UTF-8''Bab-Al-Khibrah-Brochure.pdf"
    );
    response.headers.set("Content-Length", fileBuffer.length.toString());
    response.headers.set("Cache-Control", "no-cache");
    return response;
  } catch {
    return new NextResponse("Brochure not found", { status: 404 });
  }
}
