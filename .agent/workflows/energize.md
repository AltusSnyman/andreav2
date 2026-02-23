---
description: Energize a business domain by scraping its content, designing a Stitch mockup, building a Next.js site, and injecting a Realtime Voice AI widget.
---

# Energize Workflow

This workflow automates the end-to-end creation of a next-generation AI-powered business website. 
When the user types `/energize <domain-url>`, follow these steps exactly in order:

## Step 1: Data Extraction
Use the **`website-scraper`** skill to extract the core content from the provided `<domain-url>`.
- Extract the domain name from the URL to create the folder name (e.g., `darwinlandscapers`).
- Run the scraper and let it compile the `business_details.md` file in `website-scrapes/<domain>`.

## Step 2: Design Generation
Use the **`stitch-website-builder`** skill to generate the UI/UX design mockups.
- Feed the scraped content into the Stitch builder to create the `google-stitch-site` assets.
- **CRITICAL TIMING**: The `mcp_StitchMCP_generate_screen_from_text` tool takes a long time (usually 3-5 minutes). You must build in a timer/wait loop to poll for completion before attempting to download the assets or proceeding to Step 3.

## Step 3: Next.js Site Construction
Use the **`create-live-website`** skill to build the actual codebase.
- This skill will generate the Next.js App Router project in `website-scrapes/<domain>/live-site` using the Stitch assets and the scraped Markdown.
- Ensure all dependencies (Framer Motion, Tailwind, Lucide, etc.) are installed.
- **Verification**: Run `npm run dev`, open the browser using `browser_subagent`, take **exactly ONE screenshot** of the homepage to prove it is running, and close the browser.

## Step 4: Voice AI Injection
Use the **`create-realtime-voice-ai-widget`** skill to add the conversational interface.
- Read the global environment file at `/Volumes/KINGSTON/projects/andrea_the_assistantv2/.env` to retrieve the development `OPENAI_API_KEY`.
- Inject this key into the Next.js project's local `.env` and configure the backend relay function.
- Inject the frontend widget code (`widget.css`, `widget.js`) and system prompt based on `business_details.md`.
- Ensure everything is imported into the Next.js `app/layout.tsx`.

## Finalization
Notify the user that the site is fully energized, built, and running locally with the Voice AI widget connected.
