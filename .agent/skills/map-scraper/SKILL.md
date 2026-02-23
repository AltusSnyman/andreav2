---
name: map-scraper
description: Scrapes Google Maps for business leads in a specific niche and location, saving the results to a dated folder.
---

# Map Scraper Skill

Use this skill when the user wants to find businesses (leads) on Google Maps for a specific niche in a specific location.

## Usage

1.  **Identify Inputs**:
    *   `niche`: The type of business (e.g., "roofing business", "Italian restaurant").
    *   `location`: The city or area (e.g., "Sydney", "New York").

2.  **Execute Scraper**:
    *   Use the `mcp_apify_call-actor` tool with the actor `compass/crawler-google-places`.
    *   **Configuration**:
        *   `searchStringsArray`: `["<niche>"]`
        *   `locationQuery`: `"<location>"`
        *   `maxCrawledPlacesPerSearch`: **100** (This is a hard limit to ensure the cost stays under $0.50).
        *   `countryCode`: Infer from location if possible (e.g., "au" for Sydney), otherwise leave blank or ask.

3.  **Process Results**:
    *   Wait for the actor run to complete.
    *   Get the `datasetId` from the run output.
    *   **Fetch Specific Fields**: Use `mcp_apify_get-actor-output` to fetch *only* the necessary fields. This prevents large file errors.
        *   `datasetId`: `<datasetId>`
        *   `fields`: `title,totalScore,reviewsCount,phone,website,address,url`
        *   `limit`: 100
        *   `offset`: 0
    *   Wait for the output file to be saved (note the path returned by the tool).

4.  **Save Output**:
    *   **Create Directory**: Create a new directory format: `./scrapes/<niche>+<date>` (where `<date>` is YYYY-MM-DD). code: `mkdir -p "./scrapes/<niche>+<date>"`
    *   **Format Data**: Use the shared Python script to format the results.
        *   Run command: `python3 scripts/format_map_data.py "<path_to_apify_output_file>" "./scrapes/<niche>+<date>/results.md"`
    
5.  **Notify User**:
    *   Inform the user that the scrape is complete.
    *   Provide the path to the results file.
