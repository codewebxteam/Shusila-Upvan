from PIL import Image, ImageDraw, ImageFilter, ImageFont
import os

def create_realistic_ghee_image():
    """Create a realistic ghee product image"""
    width, height = 800, 800
    img = Image.new('RGB', (width, height), color=(255, 255, 255))
    draw = ImageDraw.Draw(img)
    
    # Add subtle background gradient effect
    for y in range(height):
        shade = int(255 - (y / height) * 5)
        draw.line([(0, y), (width, y)], fill=(shade, shade, shade))
    
    # Draw realistic jar
    jar_x, jar_y = 260, 80
    jar_width, jar_height = 280, 420
    
    # Jar shadow
    draw.ellipse([jar_x - 10, jar_y + jar_height + 5, jar_x + jar_width + 10, jar_y + jar_height + 25],
                 fill=(220, 220, 220))
    
    # Jar glass edges with transparency effect
    glass_color = (230, 200, 100)
    
    # Left side highlight (glass reflection)
    draw.rectangle([jar_x, jar_y + 30, jar_x + 40, jar_y + jar_height],
                   fill=(250, 240, 200))
    
    # Main jar body
    draw.rectangle([jar_x, jar_y + 30, jar_x + jar_width, jar_y + jar_height],
                   fill=glass_color, outline=(160, 130, 40), width=3)
    
    # Jar base (darker)
    draw.ellipse([jar_x - 5, jar_y + jar_height - 30, jar_x + jar_width + 5, jar_y + jar_height + 20],
                 fill=(200, 160, 40), outline=(140, 110, 20), width=2)
    
    # Jar top (glass cap area)
    draw.rectangle([jar_x + 50, jar_y - 20, jar_x + jar_width - 50, jar_y + 40],
                   fill=(180, 180, 180), outline=(120, 120, 120), width=2)
    
    # Metal cap
    draw.ellipse([jar_x + 60, jar_y - 25, jar_x + jar_width - 60, jar_y + 10],
                 fill=(200, 200, 200), outline=(100, 100, 100), width=2)
    
    # Ghee inside (golden liquid with gradient)
    ghee_top = jar_y + 60
    ghee_height = jar_height - 80
    for y in range(int(ghee_height)):
        color_intensity = 255 - (y / ghee_height) * 50
        color = int(color_intensity)
        draw.line([(jar_x + 10, ghee_top + y), (jar_x + jar_width - 10, ghee_top + y)],
                  fill=(color, int(color * 0.9), 0))
    
    # Ghee surface with shine
    draw.ellipse([jar_x + 20, ghee_top - 10, jar_x + jar_width - 20, ghee_top + 20],
                 fill=(255, 230, 50))
    
    # Bright shine/reflection
    draw.ellipse([jar_x + 50, jar_y + 50, jar_x + 120, jar_y + 100],
                 fill=(255, 255, 200))
    
    # Text
    try:
        title_font = ImageFont.truetype("arial.ttf", 52)
        price_font = ImageFont.truetype("arial.ttf", 32)
        label_font = ImageFont.truetype("arial.ttf", 24)
    except:
        title_font = ImageFont.load_default()
        price_font = ImageFont.load_default()
        label_font = ImageFont.load_default()
    
    # Black text on white
    draw.text((width//2, 550), "VEDIC BILONA GHEE", fill=(0, 0, 0), font=title_font, anchor="mm")
    draw.text((width//2, 620), "₹1200/Kg", fill=(220, 50, 40), font=price_font, anchor="mm")
    draw.text((width//2, 680), "Premium Clarified Butter", fill=(80, 80, 80), font=label_font, anchor="mm")
    draw.text((width//2, 720), "FARM-TO-DOOR QUALITY", fill=(150, 150, 150), font=label_font, anchor="mm")
    
    # Apply slight blur for more realistic feel
    img = img.filter(ImageFilter.GaussianBlur(radius=0.5))
    
    img.save('src/assets/dairy/ghee.webp', 'WEBP', quality=95)
    print("✓ Created: ghee.webp (realistic)")

def create_realistic_curd_image():
    """Create a realistic curd product image"""
    width, height = 800, 800
    img = Image.new('RGB', (width, height), color=(255, 255, 255))
    draw = ImageDraw.Draw(img)
    
    # Add subtle background
    for y in range(height):
        shade = int(255 - (y / height) * 5)
        draw.line([(0, y), (width, y)], fill=(shade, shade, shade))
    
    # Draw realistic clay/terracotta bowl
    bowl_x, bowl_y = 260, 200
    bowl_width, bowl_height = 280, 280
    
    # Bowl shadow
    draw.ellipse([bowl_x - 20, bowl_y + bowl_height + 30, bowl_x + bowl_width + 20, bowl_y + bowl_height + 50],
                 fill=(220, 220, 220))
    
    # Outer bowl (terracotta clay color)
    clay_color = (205, 92, 23)
    draw.ellipse([bowl_x, bowl_y, bowl_x + bowl_width, bowl_y + bowl_height],
                 fill=clay_color, outline=(160, 60, 10), width=3)
    
    # Bowl rim
    draw.ellipse([bowl_x - 15, bowl_y - 10, bowl_x + bowl_width + 15, bowl_y + 50],
                 fill=(220, 110, 40), outline=(170, 70, 20), width=2)
    
    # Curd inside (creamy white with soft appearance)
    curd_inner_y = bowl_y + 40
    curd_inner_height = bowl_height - 80
    
    # Main curd area
    draw.ellipse([bowl_x + 25, curd_inner_y, bowl_x + bowl_width - 25, curd_inner_y + curd_inner_height],
                 fill=(245, 242, 235), outline=(230, 225, 215), width=2)
    
    # Curd surface texture (subtle)
    draw.ellipse([bowl_x + 40, curd_inner_y + 5, bowl_x + bowl_width - 40, curd_inner_y + 40],
                 fill=(250, 248, 245))
    
    # Shine on curd
    draw.ellipse([bowl_x + 60, curd_inner_y + 15, bowl_x + 140, curd_inner_y + 70],
                 fill=(255, 255, 250))
    
    # Brown spoon
    spoon_x = bowl_x + bowl_width + 40
    spoon_y = bowl_y + 100
    
    # Spoon handle
    draw.line([(spoon_x - 30, spoon_y - 40), (spoon_x + 50, spoon_y + 80)],
              fill=(160, 82, 45), width=6)
    
    # Spoon bowl
    draw.ellipse([spoon_x - 20, spoon_y, spoon_x + 20, spoon_y + 35],
                 fill=(180, 100, 60), outline=(140, 70, 30), width=2)
    
    # Bowl decoration lines  
    for i in range(4):
        x_pos = bowl_x + 80 + i * 60
        draw.arc([x_pos, bowl_y + 80, x_pos + 40, bowl_y + 130], 0, 180,
                fill=(255, 160, 100), width=3)
    
    # Text
    try:
        title_font = ImageFont.truetype("arial.ttf", 52)
        price_font = ImageFont.truetype("arial.ttf", 32)
        label_font = ImageFont.truetype("arial.ttf", 24)
    except:
        title_font = ImageFont.load_default()
        price_font = ImageFont.load_default()
        label_font = ImageFont.load_default()
    
    draw.text((width//2, 620), "NATURAL FARM CURD", fill=(0, 0, 0), font=title_font, anchor="mm")
    draw.text((width//2, 685), "₹60/Kg", fill=(220, 50, 40), font=price_font, anchor="mm")
    draw.text((width//2, 740), "Fresh & Creamy", fill=(80, 80, 80), font=label_font, anchor="mm")
    draw.text((width//2, 770), "FARM-TO-DOOR QUALITY", fill=(150, 150, 150), font=label_font, anchor="mm")
    
    # Apply slight blur for more realistic feel
    img = img.filter(ImageFilter.GaussianBlur(radius=0.5))
    
    img.save('src/assets/dairy/curd.webp', 'WEBP', quality=95)
    print("✓ Created: curd.webp (realistic)")

# Create images
print("Creating realistic product images...\n")
os.makedirs('src/assets/dairy', exist_ok=True)
create_realistic_ghee_image()
create_realistic_curd_image()
print("\nDone! Realistic product images created!")
