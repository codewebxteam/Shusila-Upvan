import requests
import os
from pathlib import Path
from PIL import Image
from io import BytesIO

def download_image_pixabay(search_query, filename, output_path):
    """Download image from Pixabay (free, no auth required)"""
    try:
        # Pixabay API endpoint (free tier)
        url = "https://pixabay.com/api/"
        params = {
            "q": search_query,
            "key": "42919372-0da9d53e8ad26a76be10bf26a",  # Free public key
            "image_type": "photo",
            "orientation": "horizontal",
            "min_width": "450",
            "per_page": "3"
        }
        
        response = requests.get(url, params=params, timeout=10)
        response.raise_for_status()
        
        data = response.json()
        
        if data['hits']:
            # Get the highest quality image
            image_url = data['hits'][0]['largeImageURL']
            
            # Download the image
            img_response = requests.get(image_url, timeout=10)
            img_response.raise_for_status()
            
            # Ensure output directory exists
            Path(output_path).parent.mkdir(parents=True, exist_ok=True)
            
            # Save the image
            with open(output_path, 'wb') as f:
                f.write(img_response.content)
            
            print(f"✓ Downloaded: {filename}")
            return True
        else:
            print(f"✗ No images found for: {search_query}")
            return False
            
    except Exception as e:
        print(f"✗ Error downloading {filename}: {str(e)}")
        return False

# Download images
print("Downloading product images from Pixabay...\n")

# Ghee - Clarified butter
download_image_pixabay("ghee butter dairy white background", 
                      "ghee.webp", 
                      "src/assets/dairy/ghee.webp")

# Curd - Yogurt
download_image_pixabay("curd yogurt dairy white background", 
                      "curd.webp", 
                      "src/assets/dairy/curd.webp")

print("\nDone!")
