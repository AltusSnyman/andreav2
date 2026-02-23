// public/widget.js

(function () {
    const iconMic = `<path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/><path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>`;
    const iconSquare = `<path d="M6 6h12v12H6z"/>`;

    let pc = null;
    let audioEl = null;
    let btn = null;

    // Strict prompt to adhere to the Skill rules
    const SYSTEM_PROMPT = `
  Rule 1: Always start the conversation by exactly saying: "Hi, welcome to Darwin Landscapers!"
  Rule 2: Only ask ONE question at a time. Do not overwhelm the user.
  Rule 3: Keep responses extremely concise. Strictly limit answers to 1-2 sentences maximum.
  Rule 4: Be friendly, practical, and highly conversion-focused. Encourage them to call 1300 402 517 or 0483 917 251 for a quote.
  
  Business Information:
  Name: Darwin Landscapers
  Areas: Darwin, Palmerston, Howard Springs (including Fannie Bay, Humpty Doo, Nightcliff, Bayview, etc).
  Services: Lawn Care, Garden Design, Landscaping Construction, Turf Laying, Retaining Walls, Tree Services, Irrigation, Deck Building, Paving.
  Pricing rules of thumb: 
  - Turf Installation: ~$28/m2
  - Paving: ~$90/m2 to ~$500/m2
  - Garden Decking: ~$300 - $400/m2
  - General Landscaping: $150/m2 (softscapes) to $300/m2 (with hardscapes)
  FAQs:
  - Best time to lay turf is September.
  - Landscaping improves life quality and property value.
    `;

    async function startSession() {
        btn.classList.add("connecting");
        btn.innerHTML = `<svg viewBox="0 0 24 24">${iconSquare}</svg>`;

        try {
            // 1. Get user mic
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

            // 2. Create PeerConnection
            pc = new RTCPeerConnection();

            // 3. Play remote audio when track arrives
            pc.ontrack = (e) => {
                if (!audioEl) {
                    audioEl = document.createElement("audio");
                    audioEl.autoplay = true;
                    document.body.appendChild(audioEl);
                }
                audioEl.srcObject = e.streams[0];
            };

            // 4. Add local audio track
            pc.addTrack(stream.getTracks()[0], stream);

            // 5. Create Offer
            const offer = await pc.createOffer();
            await pc.setLocalDescription(offer);

            // 6. Send to our backend
            const response = await fetch(`/api/session?instructions=${encodeURIComponent(SYSTEM_PROMPT.trim())}`, {
                method: "POST",
                body: offer.sdp,
                headers: {
                    "Content-Type": "application/sdp"
                }
            });

            if (!response.ok) {
                throw new Error("Failed to start AI session");
            }

            const answerSdp = await response.text();
            const answer = {
                type: "answer",
                sdp: answerSdp
            };

            await pc.setRemoteDescription(answer);

            // Successfully connected
            btn.classList.remove("connecting");
            btn.classList.add("active");

        } catch (err) {
            console.error("Voice AI Error:", err);
            stopSession();
        }
    }

    function stopSession() {
        if (pc) {
            pc.close();
            pc = null;
        }
        if (audioEl) {
            audioEl.pause();
            audioEl.srcObject = null;
            audioEl.remove();
            audioEl = null;
        }
        btn.classList.remove("connecting", "active");
        btn.innerHTML = `<svg viewBox="0 0 24 24">${iconMic}</svg>`;
    }

    function initWidget() {
        btn = document.getElementById("voice-ai-widget-btn");
        if (!btn) return;

        // Prevent attaching multiple times
        if (btn.dataset.initialized) return;
        btn.dataset.initialized = "true";

        btn.addEventListener("click", () => {
            if (btn.classList.contains("active") || btn.classList.contains("connecting")) {
                stopSession();
            } else {
                startSession();
            }
        });
    }

    // Try immediately
    initWidget();

    // Also observe the DOM for Next.js client-side navigations
    const observer = new MutationObserver(() => {
        initWidget();
    });

    observer.observe(document.body, { childList: true, subtree: true });
})();
