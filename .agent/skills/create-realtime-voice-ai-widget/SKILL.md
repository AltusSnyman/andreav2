---
name: create-realtime-voice-ai-widget
description: Automates adding a fully-featured, brand-matched OpenAI Realtime Voice AI widget to a Next.js website.
---

# Create Realtime Voice AI Widget Skill

This skill transforms any Next.js website into a voice-capable platform by injecting a Siri-like Voice AI widget powered by the `gpt-4o-realtime-preview` model. It handles backend routing, frontend WebRTC, semantic system prompting, and automatic brand color matching.

## Prerequisites

- A Next.js App Router project structure (`app/layout.tsx`, `public/`).
- An `OPENAI_API_KEY`.

## Workflow

### 1. Analyze Website & Brand Theme
**Goal**: Gather business context for the AI prompt and UI colors for the widget.

1.  **Read Business Details**: Use `view_file` to read the business documentation (e.g., `business_details.md`, scraped content, or provided context). Extract:
    - Business Name
    - Services
    - Locations / Service Areas
    - Contact Information (Phone, Email)
    - FAQs
2.  **Determine Brand Color**: Inspect the website's `globals.css` or Tailwind config. Identify the primary brand color (e.g., primary green `#10b981` or primary blue `#3b82f6`).

### 2. Setup Environment Variables
**Goal**: Securely store the API key.

1.  **Modify `.env`**: Check for an existing `.env` or `.env.local` file in the Next.js root. Create or append `OPENAI_API_KEY=sk-...` to this file. **Crucial**: Ensure this variable is not prefixed with `NEXT_PUBLIC_` so it stays server-side.

### 3. Create Realtime Backend Relay
**Goal**: Create a secure Next.js API route that exchanges the WebRTC Offer for an OpenAI Realtime session.

1.  **Create API Route**: Use `write_to_file` to create `app/api/session/route.ts`.
2.  **Content**: Implement the new, two-step JSON / Realtime API handshake. 
    - *Step 1*: `POST` to `https://api.openai.com/v1/realtime/sessions` with `model: "gpt-4o-realtime-preview"`, `voice: "alloy"`, and the instruction prompt passed via `req.url`. Parse the response to get `client_secret.value` (the ephemeral key).
    - *Step 2*: `POST` the raw `offerSdp` to `https://api.openai.com/v1/realtime` using the ephemeral key as Authorization. Return the resulting SDP.

### 4. Create Frontend Widget Styles
**Goal**: Create a round, floating, animated "Siri-like" toggle button that matches the brand.

1.  **Create CSS File**: Use `write_to_file` to create `public/widget.css`.
2.  **Content**:
    - `.widget-container` fixed to the bottom right.
    - `.voice-widget-btn` styled as a `65px` circle with a gradient derived from the **Brand Color** you identified in step 1.
    - Hover scales up (`1.05`).
    - Add `.connecting` class with an orange pulse animation.
    - Add `.active` class with a spinning gradient (`siri-spin`) and a glowing box-shadow (`glow`).

### 5. Create Frontend Widget Logic & Dynamic Prompt
**Goal**: Build the WebRTC audio streaming logic and formulate the highly customized system prompt.

1.  **Create JS File**: Use `write_to_file` to create `public/widget.js`.
2.  **Dynamic Prompt Construction**: Construct the prompt securely and encode it. You MUST enforce the following core rules in the prompt:
    - Rule 1: Always start the conversation by saying: "Hi, welcome to [Business Name]!"
    - Rule 2: Only ask ONE question at a time. Do not overwhelm the user.
    - Rule 3: Keep responses extremely concise. Strictly limit answers to 1-2 sentences maximum.
    - Rule 4: Include the business services, locations, and FAQs extracted in Step 1.
    - Rule 5: Be friendly, practical, and highly conversion-focused (push to call/quote).
3.  **WebRTC Logic**:
    - Request `navigator.mediaDevices.getUserMedia({ audio: true })`.
    - Create `RTCPeerConnection`, add tracks, and create an Offer.
    - Fetch `/api/session?instructions=${encodeURIComponent(prompt)}` and POST the SDP.
    - Set the Remote Description from the SDP Answer.
    - Handle state changes by toggling classes (`connecting`, `active`) and swapping out the inner SVG icon between a "Mic" icon and a "Stop/Square" icon.
4.  **Important Next.js Gotchas (DO NOT MISS)**:
    - Because Next.js uses client-side routing, `DOMContentLoaded` is unreliable. Wrap your logic in an IIFE and use a `MutationObserver` on `document.body` to initialize the button and attach the click event.
    - Declare your `btn` variable **at the top-level scope** of the IIFE so that both the observer logic and the session logic can access it without throwing a `ReferenceError: btn is not defined`.
    - Example structure:
      ```javascript
      (function() {
        let btn = null;
        let pc = null;
        function startSession() { ... }
        function initWidget() {
          btn = document.getElementById("voice-ai-widget-btn");
          if (!btn || btn.dataset.initialized) return;
          btn.dataset.initialized = "true";
          btn.addEventListener("click", ...);
        }
        initWidget();
        const observer = new MutationObserver(() => initWidget());
        observer.observe(document.body, { childList: true, subtree: true });
      })();
      ```

### 6. Fix Next.js Configuration (Optional but Recommended)
**Goal**: Prevent terminal warnings related to Next.js Image caching when injecting external or generated assets.

1.  **Modify `next.config.ts`**: If the console throws an `unconfigured-qualities` error (e.g., quality "90" is not configured), update the config file:
    ```typescript
    const nextConfig: NextConfig = {
      images: {
        qualities: [25, 50, 75, 90, 100],
      },
    };
    ```

### 6. Inject into Global Layout
**Goal**: Make the widget appear on every page of the website.

1.  **Modify `app/layout.tsx`**: Add the HTML markup just before the closing `</body>` tag.
    - `<link rel="stylesheet" href="/widget.css" />`
    - `<div className="widget-container">...[Add Button with base Mic SVG]...</div>`
    - `<script src="/widget.js"></script>` (or Next.js `<Script strategy="lazyOnload">`).

## Usage Example

When the user says "Create a voice AI widget for the project at [Path]":

1.  `view_file` the business context to understand the brand identity.
2.  `write_to_file` the `/api/session/route.ts`.
3.  `write_to_file` the `/public/widget.css` (customized to theme).
4.  `write_to_file` the `/public/widget.js` (with a tailored, strict 1-2 sentence prompt, using a MutationObserver).
5.  `replace_file_content` on `app/layout.tsx` to inject the widget code globally.
6.  `replace_file_content` on `next.config.ts` to add image `qualities: [25, 50, 75, 90, 100]` if Next.js Image warnings appear.
