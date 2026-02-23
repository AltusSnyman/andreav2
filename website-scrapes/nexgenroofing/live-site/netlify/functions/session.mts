import type { Context, Config } from "@netlify/functions";

export default async function handler(req: Request, context: Context) {
    if (req.method !== "POST") {
        return new Response("Method Not Allowed", { status: 405 });
    }

    try {
        const { searchParams } = new URL(req.url);
        const instructions = searchParams.get("instructions") || "You are a helpful assistant.";

        // 1. Get an ephemeral token from OpenAI
        const tokenResponse = await fetch("https://api.openai.com/v1/realtime/sessions", {
            method: "POST",
            headers: {
                // IMPORTANT: Use Netlify.env.get for retrieving variables in Netlify Serverless Functions
                "Authorization": `Bearer ${Netlify.env.get("OPENAI_API_KEY") || process.env.OPENAI_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "gpt-4o-realtime-preview",
                voice: "alloy",
                instructions,
            }),
        });

        if (!tokenResponse.ok) {
            const errorText = await tokenResponse.text();
            throw new Error(`Failed to get ephemeral token: ${errorText}`);
        }

        const tokenData = await tokenResponse.json();
        const ephemeralKey = tokenData.client_secret.value;

        // 2. Read the frontend's offer SDP from request body
        const offerSdp = await req.text();

        // 3. Send the offer SDP to OpenAI WebRTC endpoint
        const rtcResponse = await fetch(`https://api.openai.com/v1/realtime?model=gpt-4o-realtime-preview`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${ephemeralKey}`,
                "Content-Type": "application/sdp"
            },
            body: offerSdp,
        });

        if (!rtcResponse.ok) {
            const errorText = await rtcResponse.text();
            throw new Error(`Failed to get WebRTC answer from OpenAI: ${errorText}`);
        }

        const answerSdp = await rtcResponse.text();

        return new Response(answerSdp, {
            status: 200,
            headers: {
                "Content-Type": "application/sdp"
            }
        });
    } catch (error: any) {
        console.error("Realtime Session Error:", error);
        return new Response(`Server Error: ${error.message}`, { status: 500 });
    }
}

// Map the Netlify Function precisely to the original frontend fetch path
export const config: Config = {
    path: "/api/session"
};
