import { OnboardingData } from "@/components/onboarding/wizard";

interface PostcardContent {
    imageUrl: string;
    message: string;
    date: string;
}

const IMAGES = [
    "https://images.unsplash.com/photo-1516233758813-a38d024919c5?w=800&auto=format&fit=crop&q=60", // Bird in sky
    "https://images.unsplash.com/photo-1496348323715-c11f0fc6aeed?w=800&auto=format&fit=crop&q=60", // Clouds
    "https://images.unsplash.com/photo-1597211684694-8f238128fdd9?w=800&auto=format&fit=crop&q=60", // Sunset
    "https://images.unsplash.com/photo-1500491460312-c32fc2dbc751?w=800&auto=format&fit=crop&q=60", // Field
];

export async function generatePostcard(data: OnboardingData): Promise<PostcardContent> {
    const imageUrl = IMAGES[Math.floor(Math.random() * IMAGES.length)];
    let message = "";

    try {
        const response = await fetch("/api/generate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ petData: data, type: "postcard" }),
        });

        if (response.ok) {
            const result = await response.json();
            message = result.text;
        } else {
            console.warn("API call failed, falling back to template");
            message = "铲屎官，这里虽然没有牛肉干，但是云朵是甜的哦！不要太想我，我会骄傲的。";
        }
    } catch (e) {
        console.error("Generation error", e);
        message = "铲屎官，这里虽然没有牛肉干，但是云朵是甜的哦！不要太想我，我会骄傲的。";
    }

    return {
        imageUrl,
        message,
        date: new Date().toLocaleDateString("zh-CN"),
    };
}

export async function generateReply(data: OnboardingData, userMessage: string): Promise<string> {
    try {
        const response = await fetch("/api/generate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ petData: data, type: "reply", userMessage }),
        });

        if (response.ok) {
            const result = await response.json();
            return result.text;
        }
    } catch (e) {
        console.error("Reply generation error", e);
    }

    return "收到你的信了，我很开心。";
}
