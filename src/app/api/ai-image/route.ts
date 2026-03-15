import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { word } = await req.json();

    if (!word) {
      return NextResponse.json({ error: "No word provided" }, { status: 400 });
    }

    // TODO: OpenAI DALL-E 3 Integration
    // For now, return a placeholder or a random image from a pool
    const placeholders = [
      "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    ];
    
    const imageUrl = placeholders[Math.floor(Math.random() * placeholders.length)];

    return NextResponse.json({ imageUrl });
  } catch (error) {
    console.error("AI Image Error:", error);
    return NextResponse.json({ error: "Failed to generate image" }, { status: 500 });
  }
}
