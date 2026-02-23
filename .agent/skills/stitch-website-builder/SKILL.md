---
name: stitch-website-builder
description: Automates the creation of a 3-page website in StitchMCP using scraped content.
---

# Stitch Website Builder Skill

This skill transforms scraped website content (Markdown files) into a live 3-page website project in StitchMCP using `GEMINI_3_PRO`.

## Workflow

### 1. Content Analysis & Synthesis
**Goal**: Prepare the content for the Service and About pages by analyzing the scraped data.

1.  **Identify the Scrape Directory**: Locate the folder containing the scraped markdown files (e.g., `website-scrapes/<domain>`).
2.  **Read All Files**: Use `list_dir` to find all `.md` files and `view_file` to read their contents.
    *   *Crucial*: You must read `home.md` and any other service/about related files.
3.  **Synthesize `stitch_services.md`**:
    *   Create a new file `website-scrapes/<domain>/stitch_services.md`.
    *   **Content**: Extract and compile a comprehensive list of services, their descriptions, and any pricing information found across all scraped files. Organize this clearly with headers.
4.  **Synthesize `stitch_about.md`**:
    *   Create a new file `website-scrapes/<domain>/stitch_about.md`.
    *   **Content**: Compile business details (history, mission), contact information (phone, email, service areas), FAQs, and Testimonials found across all scraped files.

### 2. Create Stitch Project
1.  **Create Project**: Use `mcp_StitchMCP_create_project`.
    *   **Title**: The Business Name (e.g., "Darwin Landscapers").
    *   **Note**: Capture the returned `projectId`.

### 3. Generate Website
**Goal**: Generate a 3-page website using the `GEMINI_3_PRO` model.

1.  **Construct the Prompt**:
    *   **Model**: `GEMINI_3_PRO`.
    *   **Structure**:
        *   "Create a comprehensive 3-page website for [Business Name]."
        *   **Page 1: Home**: Include the **ENTIRE** content of `home.md`.
        *   **Page 2: Services**: Include the **ENTIRE** content of `stitch_services.md`.
        *   **Page 3: About**: Include the **ENTIRE** content of `stitch_about.md`.
2.  **Execute**: Call `mcp_StitchMCP_generate_screen_from_text` with the constructed prompt and the `projectId`.

### 4. Retrieve & Download Assets
**Goal**: Download the generated HTML and screenshots for local use.

1.  **Get Output**: Capture the JSON output from `generate_screen_from_text`. Save it to a file (e.g., `stitch_output.json`).
2.  **Download Assets**: Use the provided script to download the files.
    *   **Script**: `.agent/skills/stitch-website-builder/scripts/download_assets.py`.
    *   **Command**: `python3 .agent/skills/stitch-website-builder/scripts/download_assets.py stitch_output.json website-scrapes/<domain>/google-stitch-site`.

## Usage Example

When the user says "Create a Stitch website for [Business Name]" or "Use the stitch builder for [Folder]":

1.  **Read** `website-scrapes/[folder]/*.md`.
2.  **Write** `stitch_services.md` and `stitch_about.md`.
3.  **Call** `create_project(title="[Business Name]")`.
4.  **Call** `generate_screen_from_text(projectId="...", modelId="GEMINI_3_PRO", prompt="...")`.
5.  **Run** `python3 .agent/skills/stitch-website-builder/scripts/download_assets.py output.json website-scrapes/[folder]/google-stitch-site`.
