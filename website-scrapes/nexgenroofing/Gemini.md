# SystemPros AI - Roof Darwin (NexGen Roofing) Project Handoff

This document provides a comprehensive overview of the NexGen Roofing project (deployed as `systemprosai-roof-darwin`) to onboard new AI agents. It details the workflow executed, the skills utilized, the architectural structure of the codebase, and specific implementation details.

## 1. Project Overview

*   **Client/Domain:** NexGen Roofing (`nexgenroofing.com.au`)
*   **Project Name:** SystemPros AI - Roof Darwin
*   **Live URL:** [https://systemprosai-roof-darwin.netlify.app](https://systemprosai-roof-darwin.netlify.app)
*   **Primary Goal:** To rapidly generate a premium, high-converting, AI-enhanced website using the `/energize` workflow.

## 2. Workflow Orchestration: The `/energize` Process

The project was built using a multi-step, autonomous workflow designed to take a raw domain and convert it into a live, interactive web application.

### Step 1: Data Extraction
*   **Action:** Scraped the target domain to gather business context, services, FAQs, and brand identity.
*   **Output:** `business_details.md` containing the extracted knowledge.

### Step 2: Design Generation
*   **Action:** Synthesized the scraped data to generate a multi-page (Home, Services, About, Contact, Gallery) UI/UX mockup.
*   **Output:** Conceptual designs and layout structures (facilitated by StitchMCP).

### Step 3: Next.js Site Construction
*   **Action:** Bootstrapped a Next.js App Router project embodying a "Premium / Liquid Glass" aesthetic. 
*   **Details:** Implemented responsive layouts with Tailwind CSS, injected high-quality generated assets replacing old placeholders, and built reusable UI components.

### Step 4: Voice AI Injection
*   **Action:** Integrated a Realtime Voice AI widget to act as a virtual assistant.
*   **Details:** Configured the frontend widget with custom prompts derived from the business data. Set up the secure backend communication to OpenAI.

### Step 5: Netlify Deployment
*   **Action:** Prepared the Next.js app for serverless deployment and pushed it live.
*   **Details:** Configured static exports, mapped API routes to Netlify Serverless Functions, securely injected environment variables, and deployed via the Netlify MCP.

---

## 3. Agent Skills Utilized

This project relied heavily on modular agent skills located in `.agent/skills/`:

1.  **`website-scraper`**: Used Apify to crawl the domain and extract raw markdown content while filtering out noise like blogs.
2.  **`stitch-website-builder`**: Used StitchMCP to construct the initial visual mockups ensuring a cohesive design system based on the extracted data.
3.  **`create-live-website`**: Scaffolded the Next.js environment, installed dependencies (`tailwindcss`, `framer-motion`, `lucide-react`), and enforced the premium visual standard.
4.  **`create-realtime-voice-ai-widget`**: Injected the conversational AI component. Handled the heavy lifting of WebRTC connections and system prompting.
5.  **`upload_to_netlify`**: Managed the cloud infrastructure. Handled the conversion of Next.js API routes into `netlify/functions` and invoked `netlify-deploy-services`.

---

## 4. Architectural Structure

The core codebase is located at: `/Volumes/KINGSTON/projects/andrea_the_assistantv2/website-scrapes/nexgenroofing/live-site/`

### Key Directories & Files:

*   **`app/`**: The Next.js App Router containing pages (`/about`, `/contact`, `/services`, `/gallery`, etc.) and the root `layout.tsx`.
*   **`components/`**: Reusable React components.
    *   `Hero.tsx`: The main hero component featuring a background video that plays once and fades into a static image.
    *   `ui/hero-shutter-text.tsx`: A custom, highly animated text component using `framer-motion` with responsive `clamp()` typography to prevent word breakage.
*   **`netlify/functions/`**: Contains `session.mts`, the serverless backend function responsible for securely exchanging the `OPENAI_API_KEY` for an ephemeral session token, preventing credential leakage on the frontend.
*   **`public/`**: Static assets.
    *   `images/`: Contains all generated, ultra-realistic imagery (`img_home_hero.png`, `img_srv_feat_1.png`, etc.).
    *   `videos/`: Contains the `rooftimelaps.mp4` background video.
*   **`next.config.ts`**: Configured for static HTML export (`output: "export"`) with local image optimization bypassed (`unoptimized: true`) to ensure compatibility with Netlify's build environment when running without `sharp`.
*   **`netlify.toml`**: The build configuration file instructing Netlify to publish the `out` directory and run serverless functions from `netlify/functions`.

---

## 5. Critical Implementation Quirks & Fixes

When maintaining this project, keep the following context in mind:

*   **Hydration Mismatches:** If modifying the `layout.tsx`, be aware that the Voice AI widget script is injected using Next.js's native `<Script strategy="lazyOnload" />` component to prevent React hydration errors.
*   **Serverless API Masking:** The frontend still makes fetch requests to `/api/session`. However, this is intercepted and handled by the Netlify function defined in `netlify/functions/session.mts` (which maps back to the `/api/session` path). Do not recreate an `app/api/...` folder.
*   **Animated Text Wrapping:** The `hero-shutter-text.tsx` was specifically refactored to group characters by *word* in flex containers so that the animated text doesn't arbitrarily break lines mid-word on smaller screens.
*   **Turbopack Sensitivity:** The local Next.js Turbopack cache (`.next/`) has a tendency to corrupt its database state. If dev server crashes occur with database errors, `rm -rf .next` is the standard fix.
*   **Hidden MacOS Files:** Netlify deployments will fail if MacOS generated `._*` files are present. A pre-flight cleanup (`find . -name "._*" -delete`) is highly recommended before manual deployments.
