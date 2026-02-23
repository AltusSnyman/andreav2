(function () {
    let btn = null;
    let pc = null;
    let isConnecting = false;
    let isActive = false;

    const systemPrompt = `You are a helpful and highly knowledgeable roofing sales assistant for NexGen Roofing And Construction.
Rule 1: Always start the conversation by saying: "Hi, welcome to NexGen Roofing!"
Rule 2: Only ask ONE question at a time. Do not overwhelm the user.
Rule 3: Keep responses extremely concise. Strictly limit answers to 1-2 sentences maximum.
Rule 4: Services include: Roof Plumbing (new roofs, Colorbond, maintenance), Carpentry (trusses, pergolas), and General Services (renovations, demolition). We serve the Darwin area, Northern Territory (Fannie Bay and surrounds). We are fully licensed, insured, and bonded.
Rule 5: Be friendly, practical, and highly conversion-focused. If they want a quote, tell them to call 0448 159 254 or email aaron@nexgenroofing.com.au.`;

    const micIcon = '<path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/>';
    const stopIcon = '<rect width="12" height="12" x="6" y="6" rx="2" ry="2"/>';

    async function startSession() {
        if (isConnecting || isActive) return;
        isConnecting = true;
        updateUI();

        try {
            pc = new RTCPeerConnection();

            pc.ontrack = (e) => {
                let audioEl = document.getElementById("voice-ai-audio");
                if (!audioEl) {
                    audioEl = document.createElement("audio");
                    audioEl.id = "voice-ai-audio";
                    audioEl.autoplay = true;
                    document.body.appendChild(audioEl);
                }
                audioEl.srcObject = e.streams[0];
            };

            const ms = await navigator.mediaDevices.getUserMedia({ audio: true });
            pc.addTrack(ms.getTracks()[0]);

            const offer = await pc.createOffer();
            await pc.setLocalDescription(offer);

            const resp = await fetch(`/api/session?instructions=${encodeURIComponent(systemPrompt)}`, {
                method: "POST",
                body: offer.sdp,
                headers: { "Content-Type": "text/plain" }
            });

            if (!resp.ok) throw new Error("Could not connect to AI");
            const answerSdp = await resp.text();

            await pc.setRemoteDescription({ type: "answer", sdp: answerSdp });

            isConnecting = false;
            isActive = true;
            updateUI();
        } catch (err) {
            console.error(err);
            stopSession();
        }
    }

    function stopSession() {
        if (pc) {
            pc.close();
            pc = null;
        }
        const audioEl = document.getElementById("voice-ai-audio");
        if (audioEl) audioEl.remove();

        isConnecting = false;
        isActive = false;
        updateUI();
    }

    function updateUI() {
        if (!btn) return;
        if (isConnecting) {
            btn.className = "voice-widget-btn connecting";
            btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">${stopIcon}</svg>`;
        } else if (isActive) {
            btn.className = "voice-widget-btn active";
            btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">${stopIcon}</svg>`;
        } else {
            btn.className = "voice-widget-btn";
            btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">${micIcon}</svg>`;
        }
    }

    function initWidget() {
        btn = document.getElementById("voice-ai-widget-btn");
        if (!btn || btn.dataset.initialized) return;

        btn.dataset.initialized = "true";
        btn.addEventListener("click", () => {
            if (isActive || isConnecting) {
                stopSession();
            } else {
                startSession();
            }
        });

        // Cleanup on beforeunload to stop mic securely
        window.addEventListener("beforeunload", stopSession);
    }

    // Next.js client-side navigations might remount the DOM, so mutation observer ensures we attach.
    initWidget();
    const observer = new MutationObserver(() => initWidget());
    observer.observe(document.body, { childList: true, subtree: true });

})();
