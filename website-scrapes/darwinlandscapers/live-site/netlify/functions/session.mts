import type { Context, Config } from "@netlify/functions";

export default async (req: Request, context: Context) => {
    try {
        // Accessing the API Key using Netlify's specific global environment API
        const openAIKey = Netlify.env.get("OPENAI_API_KEY");
        if (!openAIKey) {
            return new Response(JSON.stringify({ error: "OpenAI API key is missing from Netlify env" }), {
                status: 500,
                headers: { "Content-Type": "application/json" }
            });
        }

        // Parse the system instructions from URL query parameters
        const url = new URL(req.url);
        const instructions = url.searchParams.get("instructions") || "You are a helpful assistant.";

        // Step 1: Create a Realtime session and retrieve an ephemeral token
        const sessionResponse = await fetch(
            "https://api.openai.com/v1/realtime/sessions",
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${openAIKey}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    model: "gpt-4o-realtime-preview",
                    voice: "alloy",
                    instructions: instructions,
                }),
            }
        );

        if (!sessionResponse.ok) {
            const errorText = await sessionResponse.text();
            console.error("OpenAI Realtime Session Error:", errorText);
            throw new Error(`Failed to get session token: ${sessionResponse.status}`);
        }

        const sessionData = await sessionResponse.json();
        const ephemeralKey = sessionData.client_secret.value;

        // Step 2: Forward the WebRTC SDP offer from the client to OpenAI
        const body = await req.text(); // The raw SDP offer

        const sdpResponse = await fetch(
            "https://api.openai.com/v1/realtime?model=gpt-4o-realtime-preview",
            {
                method: "POST",
                body,
                headers: {
                    Authorization: `Bearer ${ephemeralKey}`,
                    "Content-Type": "application/sdp",
                },
            }
        );

        if (!sdpResponse.ok) {
            const errorText = await sdpResponse.text();
            console.error("OpenAI SDP Answer Error:", errorText);
            throw new Error(`Failed to get SDP answer: ${sdpResponse.status}`);
        }

        const answer = await sdpResponse.text();

        return new Response(answer, {
            headers: {
                "Content-Type": "application/sdp",
            },
        });
    } catch (error: any) {
        console.error("Session API Error:", error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
};

export const config: Config = {
    // Configured to override the Next.js path so that the frontend code (/api/session) works without changes
    path: "/api/session"
};
