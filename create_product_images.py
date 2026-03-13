from PIL import Image, ImageDraw, ImageFont, ImageFilter
import os

def create_ghee_image():
    """Create a professional ghee product image with white background"""
    width, height = 800, 800
    img = Image.new('RGB', (width, height), color='white')
    draw = ImageDraw.Draw(img)
    
    # Draw jar shape
    jar_x, jar_y = 260, 150
    jar_width, jar_height = 280, 350
    
    # Jar body - golden color
    draw.ellipse([jar_x, jar_y, jar_x + jar_width, jar_y + 50], fill=(218, 165, 32))
    draw.rectangle([jar_x, jar_y + 25, jar_x + jar_width, jar_y + jar_height], fill=(218, 165, 32))
    draw.ellipse([jar_x, jar_y + jar_height - 50, jar_x + jar_width, jar_y + jar_height], fill=(198, 145, 12))
    
    # Jar outline
    draw.ellipse([jar_x, jar_y, jar_x + jar_width, jar_y + 50], outline=(139, 100, 0), width=2)
    draw.rectangle([jar_x, jar_y + 25, jar_x + jar_width, jar_y + jar_height], outline=(139, 100, 0), width=2)
    
    # Jar lid
    lid_x, lid_y = 290, 120
    draw.ellipse([lid_x, lid_y, lid_x + 220, lid_y + 35], fill=(192, 192, 192), outline=(100, 100, 100), width=2)
    
    # Ghee inside (lighter golden)
    inner_y = jar_y + 60
    draw.rectangle([jar_x + 10, inner_y, jar_x + jar_width - 10, jar_y + jar_height - 15], fill=(255, 215, 0))
    
    # Shine effect
    draw.rectangle([jar_x + 30, jar_y + 40, jar_x + 80, jar_y + 150], fill=(255, 255, 200), outline=None)
    
    # Text
    try:
        title_font = ImageFont.truetype("arial.ttf", 48)
        subtitle_font = ImageFont.truetype("arial.ttf", 28)
    except:
        title_font = ImageFont.load_default()
        subtitle_font = ImageFont.load_default()
    
    draw.text((width//2, 550), "VEDIC BILONA GHEE", fill=(0, 0, 0), font=title_font, anchor="mm")
    draw.text((width//2, 620), "₹1200 / 1Kg", fill=(228, 50, 45), font=subtitle_font, anchor="mm")
    draw.text((width//2, 670), "FARM-TO-DOOR QUALITY", fill=(100, 100, 100), font=subtitle_font, anchor="mm")
    
    img.save('src/assets/dairy/ghee.webp', 'WEBP')
    print("✓ Created: ghee.webp")

def create_curd_image():
    """Create a professional curd product image with white background"""
    width, height = 800, 800
    img = Image.new('RGB', (width, height), color='white')
    draw = ImageDraw.Draw(img)
    
    # Draw bowl shape
    bowl_center_x, bowl_center_y = width // 2, 350
    bowl_width, bowl_height = 280, 200
    
    # Bowl body - terracotta
    draw.ellipse([bowl_center_x - bowl_width//2, bowl_center_y - bowl_height//2,
                  bowl_center_x + bowl_width//2, bowl_center_y + bowl_height//2],
                 fill=(210, 105, 30), outline=(139, 69, 19), width=2)
    
    # Curd inside - white/cream
    inner_top = bowl_center_y - bowl_height//2 + 30
    draw.ellipse([bowl_center_x - (bowl_width-40)//2, inner_top,
                  bowl_center_x + (bowl_width-40)//2, bowl_center_y + 80],
                 fill=(245, 245, 220), outline=(230, 230, 200), width=1)
    
    # Decorative patterns on bowl
    pattern_y = bowl_center_y - 50
    for i in range(4):
        x = bowl_center_x - 100 + i * 70
        draw.arc([x - 15, pattern_y, x + 15, pattern_y + 30], 0, 180, fill=(255, 200, 150), width=3)
    
    # Spoon
    spoon_x, spoon_y = bowl_center_x + 150, bowl_center_y + 60
    draw.line([spoon_x - 30, spoon_y - 40, spoon_x + 40, spoon_y + 60], fill=(184, 115, 51), width=4)
    draw.ellipse([spoon_x - 10, spoon_y - 15, spoon_x + 10, spoon_y + 5], fill=(184, 115, 51))
    
    # Text
    try:
        title_font = ImageFont.truetype("arial.ttf", 48)
        subtitle_font = ImageFont.truetype("arial.ttf", 28)
    except:
        title_font = ImageFont.load_default()
        subtitle_font = ImageFont.load_default()
    
    draw.text((width//2, 600), "NATURAL FARM CURD", fill=(0, 0, 0), font=title_font, anchor="mm")
    draw.text((width//2, 670), "₹60 / 1Kg", fill=(228, 50, 45), font=subtitle_font, anchor="mm")
    draw.text((width//2, 720), "FARM-TO-DOOR QUALITY", fill=(100, 100, 100), font=subtitle_font, anchor="mm")
    
    img.save('src/assets/dairy/curd.webp', 'WEBP')
    print("✓ Created: curd.webp")

# Create images
print("Creating high-quality product images with white backgrounds...\n")
os.makedirs('src/assets/dairy', exist_ok=True)
create_ghee_image()
create_curd_image()
print("\nDone! New images created successfully!")
