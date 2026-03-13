import requests
from PIL import Image
from io import BytesIO
import os

def download_and_save_image(url, output_path, timeout=15):
    """Download image from URL and save"""
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        
        response = requests.get(url, headers=headers, timeout=timeout, verify=False)
        response.raise_for_status()
        
        # Open image
        img = Image.open(BytesIO(response.content))
        
        # Convert to RGB if needed
        if img.mode in ('RGBA', 'LA', 'P'):
            rgb_img = Image.new('RGB', img.size, (255, 255, 255))
            rgb_img.paste(img, mask=img.split()[-1] if img.mode == 'RGBA' else None)
            img = rgb_img
        
        # Save as WEBP
        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        img.save(output_path, 'WEBP', quality=95)
        
        print(f"✓ Downloaded and saved: {os.path.basename(output_path)}")
        return True
        
    except Exception as e:
        print(f"✗ Error downloading from {url}: {str(e)}")
        return False

print("Downloading real product images...\n")

# Real ghee images
ghee_urls = [
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",  # Honey/Ghee
    "https://images.unsplash.com/photo-1563379091339-03b21ab4a104?w=800&q=80",  # Golden liquid
]

# Real curd/yogurt images  
curd_urls = [
    "https://images.unsplash.com/photo-1516700544257-0f9f5023e520?w=800&q=80",  # Yogurt bowl
    "https://images.unsplash.com/photo-1488477181946-6d033ee7d636?w=600&q=80",  # Yogurt
    "https://images.unsplash.com/photo-1608828523903-7ee0a8447ab8?w=600&q=80",  # White yogurt
]

print("Downloading Ghee image (real photo)...")
downloaded = False
for url in ghee_urls:
    if download_and_save_image(url, "src/assets/dairy/ghee.webp"):
        downloaded = True
        break

if not downloaded:
    print("⚠ Failed to download ghee")

print("\nDownloading Curd image (real photo)...")
downloaded = False
for url in curd_urls:
    if download_and_save_image(url, "src/assets/dairy/curd.webp"):
        downloaded = True
        break

if not downloaded:
    print("⚠ Failed to download curd")

print("\nDone!")
