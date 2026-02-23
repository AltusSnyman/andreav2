import os
import json
import requests
import argparse
from urllib.parse import urlparse

def download_assets(json_file_path, output_dir):
    """
    Parses the Stitch JSON output and downloads HTML and Screenshots.
    """
    with open(json_file_path, 'r') as f:
        data = json.load(f)

    # Handle different potential JSON structures, focusing on "outputComponents" -> "design" -> "screens"
    screens = []
    if "outputComponents" in data:
        for component in data["outputComponents"]:
             if "design" in component and "screens" in component["design"]:
                 screens.extend(component["design"]["screens"])
    
    # If structure is different (flat list of screens?), try to adapt. 
    # But based on observed output, the above is correct.

    if not screens:
        print("No screens found in the JSON output.")
        return

    os.makedirs(output_dir, exist_ok=True)

    for i, screen in enumerate(screens):
        # Determine a safe filename prefix
        title = screen.get("title", f"screen_{i+1}")
        safe_title = "".join(x for x in title if x.isalnum() or x in (' ', '-', '_')).strip().replace(" ", "_").lower()
        
        # Download Screenshot
        if "screenshot" in screen and "downloadUrl" in screen["screenshot"]:
            url = screen["screenshot"]["downloadUrl"]
            filename = f"{safe_title}.png"
            download_file(url, os.path.join(output_dir, filename))

        # Download HTML
        if "htmlCode" in screen and "downloadUrl" in screen["htmlCode"]:
            url = screen["htmlCode"]["downloadUrl"]
            filename = f"{safe_title}.html"
            download_file(url, os.path.join(output_dir, filename))

def download_file(url, filepath):
    try:
        print(f"Downloading {url} to {filepath}...")
        response = requests.get(url, stream=True)
        response.raise_for_status()
        with open(filepath, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)
        print(f"Successfully saved to {filepath}")
    except Exception as e:
        print(f"Failed to download {url}: {e}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Download Stitch assets from JSON output.")
    parser.add_argument("json_file", help="Path to the JSON file containing Stitch output.")
    parser.add_argument("output_dir", help="Directory to save downloaded assets.")
    args = parser.parse_args()

    download_assets(args.json_file, args.output_dir)
