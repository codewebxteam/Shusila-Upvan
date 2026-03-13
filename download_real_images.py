import urllib.request
import os
from pathlib import Path
import ssl

# Ignore SSL warnings for this operation
ssl._create_default_https_context = ssl._create_unverified_context

def download_real_image(url, output_path, image_name):
    """Download real image from URL"""
    try:
        # Create directory if needed
        Path(output_path).parent.mkdir(parents=True, exist_ok=True)
        
        # Download with user agent
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
        request = urllib.request.Request(url, headers=headers)
        
        with urllib.request.urlopen(request, timeout=15) as response:
            image_data = response.read()
        
        # Save image
        with open(output_path, 'wb') as f:
            f.write(image_data)
        
        print(f"✓ Downloaded real image: {image_name}")
        return True
        
    except Exception as e:
        print(f"✗ Failed to download {image_name}: {str(e)}")
        return False

print("Downloading real product images...\n")

# Real product images URLs from direct sources
ghee_urls = [
    "https://images.pexels.com/photos/3296/food-healthy-spoon-kitchen.jpg?auto=compress&cs=tinysrgb&w=600",
    "https://cdn.pixabay.com/photo/2015/04/13/17/45/food-720135_640.jpg",
]

# Curd/Yogurt images
curd_urls = [
    "https://images.pexels.com/photos/5737416/pexels-photo-5737416.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://cdn.pixabay.com/photo/2014/12/22/10/20/dairy-products-576699_640.jpg",
]

# Try downloading ghee
print("Downloading Ghee (real photo)...")
downloaded_ghee = False
for url in ghee_urls:
    if download_real_image(url, "src/assets/dairy/ghee.webp", "Ghee"):
        downloaded_ghee = True
        break

if not downloaded_ghee:
    print("⚠ Could not download ghee from primary sources")

# Try downloading curd
print("\nDownloading Curd (real photo)...")
downloaded_curd = False
for url in curd_urls:
    if download_real_image(url, "src/assets/dairy/curd.webp", "Curd"):
        downloaded_curd = True
        break

if not downloaded_curd:
    print("⚠ Could not download curd from primary sources")

print("\nDone!")
