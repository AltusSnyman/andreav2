import json
import os
import sys
import argparse
from urllib.parse import urlparse
import re

def sanitize_filename(name):
    """
    Sanitize the filename by removing invalid characters and replacing slashes with dashes.
    """
    # Remove protocol and domain if passed (though we usually pass path)
    # Replace non-alphanumeric characters (except dashes and dots) with nothing
    name = re.sub(r'[^\w\-\.]', '-', name)
    # Collapse multiple dashes
    name = re.sub(r'-+', '-', name)
    # Remove leading/trailing dashes
    name = name.strip('-')
    return name

def process_website_content(input_file, output_dir):
    print(f"Reading from: {input_file}")
    try:
        with open(input_file, 'r') as f:
            content = f.read()
        
        # Handle potential markdown code block wrapping
        if content.strip().startswith("```json"):
            content = content.replace("```json", "", 1)
        if content.strip().endswith("```"):
            content = content.strip()[:-3]
            
        data = json.loads(content)
        print(f"Loaded {len(data)} items.")
    except Exception as e:
        print(f"Error loading input file: {e}")
        sys.exit(1)

    # Ensure output directory exists
    os.makedirs(output_dir, exist_ok=True)
    print(f"Output directory: {output_dir}")

    for item in data:
        url = item.get('url')
        if not url:
            continue
            
        parsed_url = urlparse(url)
        path = parsed_url.path
        
        # Determine filename
        if path == '' or path == '/':
            filename = 'home.md'
        else:
            # Create a filename from the path
            filename = sanitize_filename(path)
            if not filename.lower().endswith('.md'):
                filename += '.md'
        
        # Full path
        file_path = os.path.join(output_dir, filename)
        
        # Get content
        markdown_content = item.get('markdown')
        if not markdown_content:
            # Fallback to text if markdown not available
            markdown_content = item.get('text', '')
            
        # Add metadata header
        full_content = f"""---
url: {url}
title: {item.get('metadata', {}).get('title', 'Unknown')}
date_scraped: {item.get('metadata', {}).get('timestamp', 'Unknown')}
---

{markdown_content}
"""

        try:
            with open(file_path, 'w') as f:
                f.write(full_content)
            print(f"Saved: {filename}")
        except Exception as e:
            print(f"Error saving {filename}: {e}")

    print("Processing complete.")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Process Apify Website Content Crawler results.')
    parser.add_argument('input_file', help='Path to the input JSON file')
    parser.add_argument('output_dir', help='Directory to save the markdown files')
    args = parser.parse_args()

    process_website_content(args.input_file, args.output_dir)
