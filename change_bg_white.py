from PIL import Image
import os

images = [
    'src/assets/dairy/ghee.webp',
    'src/assets/dairy/curd.webp'
]

def change_background_to_white(image_path):
    try:
        # Open the image
        img = Image.open(image_path)
        
        # Convert to RGBA if not already
        if img.mode != 'RGBA':
            img = img.convert('RGBA')
        
        # Create a white background
        white_bg = Image.new('RGB', img.size, (255, 255, 255))
        
        # Paste the image on the white background using alpha channel
        white_bg.paste(img, (0, 0), img)
        
        # Convert back to original format if needed and save
        white_bg.save(image_path, 'WEBP')
        
        print(f"✓ Successfully processed: {image_path}")
    except Exception as e:
        print(f"✗ Error processing {image_path}: {str(e)}")

print("Starting background conversion to white...\n")
for img_path in images:
    change_background_to_white(img_path)
print("\nDone!")
