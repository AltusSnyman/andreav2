import json
import os
import sys
import argparse

def format_map_data(input_file, output_file):
    print(f"Reading from: {input_file}")
    try:
        with open(input_file, 'r') as f:
            content = f.read()

        # Clean up markdown code blocks if present (common issue with Apify tool output)
        if content.strip().startswith("```json"):
            content = content.replace("```json", "", 1)
        if content.strip().endswith("```"):
            content = content.strip()[:-3]
        
        data = json.loads(content)
        print(f"Loaded {len(data)} items.")
    except Exception as e:
        print(f"Error loading input file: {e}")
        # If it's a list error, maybe it's not a list?
        sys.exit(1)

    # Ensure output directory exists
    os.makedirs(os.path.dirname(output_file), exist_ok=True)

    print(f"Writing to: {output_file}")
    try:
        with open(output_file, 'w') as f:
            f.write(f"# Scrape Results\n\n")
            # Try to get date from filename or current date? 
            # For now, just generic header or maybe passed as arg?
            f.write(f"**Total Results:** {len(data)}\n\n")

            f.write("## Top Rated Businesses (4.5+ Stars)\n")
            f.write("| Name | Rating | Reviews | Phone | Website |\n")
            f.write("|---|---|---|---|---|\n")
            
            for item in data:
                rating = item.get('totalScore')
                if rating is None:
                    continue
                
                try:
                    rating_val = float(rating)
                except (ValueError, TypeError):
                    continue

                if rating_val >= 4.5:
                     name = item.get('title', 'N/A').replace('|', '\|')
                     reviews = item.get('reviewsCount', 0) or 0
                     phone = item.get('phone', 'N/A')
                     website = item.get('website', 'N/A')
                     if website != 'N/A':
                         website = f"[Link]({website})"
                     f.write(f"| {name} | {rating} | {reviews} | {phone} | {website} |\n")

            f.write("\n## Detailed Results\n")
            for item in data:
                name = item.get('title', 'N/A')
                rating = item.get('totalScore', 'N/A')
                reviews = item.get('reviewsCount', 'N/A')
                phone = item.get('phone', 'N/A')
                website = item.get('website', 'N/A')
                address = item.get('address', 'N/A')
                
                f.write(f"### {name}\n")
                f.write(f"- **Rating:** {rating} ({reviews} reviews)\n")
                f.write(f"- **Phone:** {phone}\n")
                f.write(f"- **Address:** {address}\n")
                if website != 'N/A':
                    f.write(f"- **Website:** {website}\n")
                
                url = item.get('url') or item.get('searchPageUrl')
                if url:
                    f.write(f"- **Google Maps:** [Link]({url})\n")
                f.write("\n")
        print("Formatting complete.")

    except Exception as e:
        print(f"Error writing output file: {e}")
        sys.exit(1)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Format Apify Google Maps results to Markdown.')
    parser.add_argument('input_file', help='Path to the input JSON file')
    parser.add_argument('output_file', help='Path to the output Markdown file')
    args = parser.parse_args()

    format_map_data(args.input_file, args.output_file)
