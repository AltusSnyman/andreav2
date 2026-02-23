import os
import requests

# Define the assets to download
assets = [
    {
        "filename": "home.html",
        "url": "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ5Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpYCiVodG1sX2YzYjY0MjdlYjFmYTQ0NDhhZTE0MDExNjdkNWU2OTYxEgsSBxCG-PXmhQoYAZIBIQoKcHJvamVjdF9pZBITQhE1MDgwNTEwODk3ODY5NjYwOQ&filename=&opi=96797242"
    },
    {
        "filename": "home.png",
        "url": "https://lh3.googleusercontent.com/aida/AOfcidXUn-iggnBWhwnkTnD-Q-hZGfEdcCTO2mucS9PQ7-yux2MFMHu_w-sG8NT1EGKd6XMKfVZ37ZOhsJxfF1tmLMmnsMGDJNVkTK-QqwvimcueNCww-UIyRWfK8d9gR7_Rqn8gHMF9I2kYXs0fGv0X0Jg0AM_o329zk6v-aIorlMt7LHdjhlKID5MpdFtZ1-03H1CtLgIVOgi-jzzx5rEPAFjbYI6Qk3if9vSbj--awvWqHfaelOVC71U"
    },
    {
        "filename": "services.html",
        "url": "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ5Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpYCiVodG1sXzdhMmExNTk4OTBhZDQ2NzBhODUwZmVkYmViMTk0NjY5EgsSBxCG-PXmhQoYAZIBIQoKcHJvamVjdF9pZBITQhE1MDgwNTEwODk3ODY5NjYwOQ&filename=&opi=96797242"
    },
    {
        "filename": "services.png",
        "url": "https://lh3.googleusercontent.com/aida/AOfcidUNJ6t6q4PZTMHuTaWpfsU90jqlI3F25Mn9Y-bSD8Me7dKFEUyu0TDhTUlGLfyyTdocxTWYGMbgkOVvfLqGnWRm4IpTKLqcDtKTHnB1HpIsd9sFgAcLU_c9mWfHtBdKqO60rkhMh2New05k7HvaQwK0FgnR4W8W82H1z4L_8AVL6h4UoMfxRxs9u1946SEd-5guLPZRaj7DOmtdYGsrHsqNmdNO4OBWaua2aSiva9-v_RWpPtFgfTWc"
    },
    {
        "filename": "about.html",
        "url": "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ5Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpYCiVodG1sX2ZjNzEwN2Q3ZmZiODQyODRhYWQ2OWJjNjU1YzM2OTgwEgsSBxCG-PXmhQoYAZIBIQoKcHJvamVjdF9pZBITQhE1MDgwNTEwODk3ODY5NjYwOQ&filename=&opi=96797242"
    },
    {
        "filename": "about.png",
        "url": "https://lh3.googleusercontent.com/aida/AOfcidXhe-_QJcLRlxi0LlfrWOzV4rtQ-keL3Um4scgCYFTYJA8A7EaQYSTZ350sg_y8C-IFVkjL8_zP7pS7p3P-hdx2egF0l2GXuY4-EU9vkhHuT-u4WNv_MQnIm7v5EVx-0a_skc_pIsEnZRIZXb89lBtxRzS7cV18oiFa5FBYX1xqpWXiXPPYl7E_t26guGFh6y7u2AaTQUgzsqzW4ubTXdSRYODeYeVAr4jFPbIEBUQA4Rg2pJYc-F8"
    }
]

output_dir = "website-scrapes/darwinlandscapers/google-stitch-site"
os.makedirs(output_dir, exist_ok=True)

for asset in assets:
    try:
        response = requests.get(asset["url"])
        response.raise_for_status()
        file_path = os.path.join(output_dir, asset["filename"])
        with open(file_path, "wb") as f:
            f.write(response.content)
        print(f"Downloaded: {asset['filename']}")
    except Exception as e:
        print(f"Failed to download {asset['filename']}: {e}")
