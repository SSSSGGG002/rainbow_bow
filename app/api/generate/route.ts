import { NextResponse } from "next/server";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_BASE_URL = process.env.OPENAI_BASE_URL || "https://api.openai.com/v1";
const OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-3.5-turbo";

export async function POST(req: Request) {
    if (!OPENAI_API_KEY) {
        return NextResponse.json(
            { error: "OpenAI API Key not configured" },
            { status: 500 }
        );
    }

    try {
        const { petData, type, userMessage } = await req.json();

        let systemPrompt = `你是一只名叫"${petData.name}"的宠物，品种是${petData.breed}。
你已经离开了地球，现在生活在彩虹桥的云端。
你的性格是：${petData.personality}。
你最爱的东西是：${petData.favorites}。
你最怕的东西是：${petData.fears}。
你离开的日子是：${petData.passingDate}。

请用你的语气给曾经的主人（铲屎官）写一段话。
风格要求：
1. 温暖、治愈，带一点点调皮或符合你性格的特点。
2. 不要太悲伤，要告诉主人你在云端过得很好。
3. 篇幅不要太长，100字以内。
4. 称呼主人为"铲屎官"或"妈妈/爸爸"。`;

        let userPrompt = "";

        if (type === "postcard") {
            userPrompt = "请给我写一张明信片，描述一下你在云端的生活，或者你现在的想法。";
        } else if (type === "reply") {
            userPrompt = `主人给你写了一封信："${userMessage}"\n请回复这封信。`;
        }

        console.log(`Calling LLM: ${OPENAI_BASE_URL}, Model: ${OPENAI_MODEL}`);

        const response = await fetch(`${OPENAI_BASE_URL}/chat/completions`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: OPENAI_MODEL,
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: userPrompt },
                ],
                temperature: 0.7,
                max_tokens: 200,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error?.message || `API Error: ${response.status} ${response.statusText}`);
        }

        const generatedText = data.choices[0].message.content;

        return NextResponse.json({ text: generatedText });
    } catch (error: any) {
        console.error("LLM Generation Error Details:", {
            message: error.message,
            cause: error.cause,
            stack: error.stack,
        });
        return NextResponse.json(
            { error: "Failed to generate content", details: error.message },
            { status: 500 }
        );
    }
}
