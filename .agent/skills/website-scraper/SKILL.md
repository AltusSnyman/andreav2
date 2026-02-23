---
name: website-scraper
description: Scrapes a business website for core pages (About, Services, Contact, etc.) while excluding blogs. Saves content as Markdown.
---

# Website Scraper Skill

This skill scrapes a target website using the `apify/website-content-crawler` actor and saves the core business pages as Markdown files.

## Workflow

1.  **Run `apify/website-content-crawler`**
    -   **Target**: User-provided URL.
    -   **Limits**: Max 5 pages, 2-minute timeout.
    -   **Filters**: Includes About, Services, Contact, etc. Excludes Blogs, News, tags.
    -   **Output**: Dataset with markdown content.

2.  **Process Results**
    -   Fetch the dataset items.
    -   Run `scripts/process_website_content.py` to save them as Markdown files in `website-scrapes/<domain>`.

## Usage

When the user asks to "scrape [URL]" or "use the website scraper on [URL]":

1.  **Extract the Domain Name** from the URL (e.g., `cherrybrookplumbing` from `cherrybrookplumbing.com.au`).

2.  **Execute the Actor**:

    ```python
    print(default_api.mcp_apify_call-actor(
        actor="apify/website-content-crawler",
        async=False,
        callOptions={"timeout": 120},
        input={
            "startUrls": [{"url": "TARGET_URL_HERE", "method": "GET"}],
            "maxCrawlPages": 5,
            "maxCrawlDepth": 2,
            "maxResults": 5,
            "proxyConfiguration": {"useApifyProxy": True},
            "crawlerType": "playwright:adaptive",
            "saveMarkdown": True,
            "saveHtmlAsFile": True,
            "removeCookieWarnings": True,
            "aggressivePrune": False,
            "expandIframes": True,
            "clickElementsCssSelector": "[aria-expanded=\"false\"]",
            "includeUrlGlobs": [
                {"glob": "**/"},
                {"glob": "**/about**"},
                {"glob": "**/service**"},
                {"glob": "**/services**"},
                {"glob": "**/location**"},
                {"glob": "**/areas**"},
                {"glob": "**/suburb**"},
                {"glob": "**/testimonial**"},
                {"glob": "**/review**"},
                {"glob": "**/contact**"},
                {"glob": "**/quote**"},
                {"glob": "**/book**"},
                {"glob": "**/pricing**"}
            ],
            "excludeUrlGlobs": [
                {"glob": "**/blog/**"},
                {"glob": "**/blogs/**"},
                {"glob": "**/news/**"},
                {"glob": "**/articles/**"},
                {"glob": "**/category/**"},
                {"glob": "**/tag/**"},
                {"glob": "**/author/**"},
                {"glob": "**/*?s=*"},
                {"glob": "**/*utm_*"}
            ]
        }
    ))
    ```

3.  **Get the Dataset ID** from the actor output.

4.  **Fetch the Results**:
    Use `mcp_apify_get-actor-output` to get the data. It's recommended to fetch specific fields to avoid huge payloads if not necessary, but for this script we usually need the full item or at least `url`, `markdown`, `metadata`, `text`.

    ```python
    # Fetch to a file to handle size
    print(default_api.mcp_apify_get-actor-output(
        datasetId="DATASET_ID_HERE",
        limit=5,
        offset=0
    ))
    ```

    *Check the output file. If it's too large or truncated, fetch items individually.*

5.  **Run the Processing Script**:

    ```bash
    python3 scripts/process_website_content.py "PATH_TO_OUTPUT_FILE" "website-scrapes/DOMAIN_NAME"
    ```

6.  **Verify**:
    -   Check that files exist in `website-scrapes/DOMAIN_NAME`.
    -   Notify the user.

7.  **Gather Business Details & Compile**:
    -   **Read existing files** in `website-scrapes/DOMAIN_NAME` to get a baseline.
    -   **Use `search_web`** (do NOT use browser) to find missing specific details:
        -   Business Name & Contact Info
        -   Products & Brands
        -   Services (comprehensive list)
        -   Locations & Service Areas
        -   FAQs (Frequently Asked Questions)
        -   Testimonials & Reviews
        -   Emergency Services & Operating Hours
    -   **Compile** all findings into a new file: `website-scrapes/DOMAIN_NAME/business_details.md`.
    -   **Format**: Use a clean Markdown structure with headers for each section.
