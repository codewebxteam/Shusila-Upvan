from PIL import Image, ImageDraw, ImageFilter, ImageOps
import os

def create_ghee_image_no_text():
    """Create a realistic ghee image without text"""
    width, height = 600, 700
    img = Image.new('RGB', (width, height), color=(248, 248, 248))
    draw = ImageDraw.Draw(img, 'RGBA')
    
    # Subtle background gradient
    for y in range(height):
        alpha = int(5 + (y / height) * 15)
        color = (255 - alpha, 255 - alpha, 255 - alpha)
        draw.line([(0, y), (width, y)], fill=color)
    
    # Draw realistic jar
    jar_x, jar_y = 150, 50
    jar_width, jar_height = 300, 380
    
    # Jar shadow beneath
    shadow_y = jar_y + jar_height + 20
    draw.ellipse([jar_x - 20, shadow_y, jar_x + jar_width + 20, shadow_y + 25],
                 fill=(200, 200, 200, 80))
    
    # Jar glass body with golden color
    draw.rectangle([jar_x, jar_y + 40, jar_x + jar_width, jar_y + jar_height],
                   fill=(220, 190, 80), outline=(160, 130, 40), width=2)
    
    # Jar top (glass neck)
    draw.rectangle([jar_x + 80, jar_y, jar_x + jar_width - 80, jar_y + 50],
                   fill=(210, 180, 70), outline=(150, 120, 30), width=2)
    
    # Metal lid/cap
    draw.ellipse([jar_x + 70, jar_y - 20, jar_x + jar_width - 70, jar_y + 15],
                 fill=(200, 200, 200), outline=(120, 120, 120), width=2)
    
    # Base of jar
    draw.ellipse([jar_x - 5, jar_y + jar_height - 25, jar_x + jar_width + 5, jar_y + jar_height + 15],
                 fill=(190, 160, 50), outline=(130, 100, 20), width=2)
    
    # Ghee liquid inside with gradient
    ghee_color_top = (255, 220, 50)
    ghee_color_bottom = (220, 180, 30)
    
    liquid_start_y = jar_y + 60
    liquid_height = jar_height - 90
    
    for y in range(int(liquid_height)):
        ratio = y / liquid_height
        r = int(255 - (255 - 220) * ratio)
        g = int(220 - (220 - 180) * ratio)
        b = int(50 - (50 - 30) * ratio)
        draw.line([(jar_x + 10, liquid_start_y + y), (jar_x + jar_width - 10, liquid_start_y + y)],
                  fill=(r, g, b))
    
    # Ghee surface shimmer
    draw.ellipse([jar_x + 30, liquid_start_y - 15, jar_x + jar_width - 30, liquid_start_y + 25],
                 fill=(255, 240, 100))
    
    # Glass shine/reflection
    draw.rectangle([jar_x + 20, jar_y + 60, jar_x + 80, jar_y + 250],
                   fill=(255, 250, 200, 100))
    
    # Apply blur for smooth look
    img = img.filter(ImageFilter.GaussianBlur(radius=0.8))
    
    img.save('src/assets/dairy/ghee.webp', 'WEBP', quality=95)
    print("✓ Created: ghee.webp (realistic, no text)")

def create_curd_image_no_text():
    """Create a realistic curd image without text"""
    width, height = 600, 700
    img = Image.new('RGB', (width, height), color=(248, 248, 248))
    draw = ImageDraw.Draw(img, 'RGBA')
    
    # Subtle background gradient
    for y in range(height):
        alpha = int(5 + (y / height) * 15)
        color = (255 - alpha, 255 - alpha, 255 - alpha)
        draw.line([(0, y), (width, y)], fill=color)
    
    # Draw realistic terracotta bowl
    bowl_x, bowl_y = 150, 150
    bowl_width, bowl_height = 300, 250
    
    # Bowl shadow
    shadow_y = bowl_y + bowl_height + 30
    draw.ellipse([bowl_x - 30, shadow_y, bowl_x + bowl_width + 30, shadow_y + 20],
                 fill=(200, 200, 200, 80))
    
    # Outer bowl - terracotta
    clay_orange = (210, 100, 25)
    draw.ellipse([bowl_x, bowl_y, bowl_x + bowl_width, bowl_y + bowl_height],
                 fill=clay_orange, outline=(160, 70, 10), width=3)
    
    # Bowl rim (top edge)
    rim_color = (230, 120, 40)
    draw.ellipse([bowl_x - 20, bowl_y - 15, bowl_x + bowl_width + 20, bowl_y + 40],
                 fill=rim_color, outline=(180, 80, 20), width=2)
    
    # Inner curd - creamy white
    curd_start_y = bowl_y + 30
    curd_color = (245, 243, 240)
    draw.ellipse([bowl_x + 25, curd_start_y, bowl_x + bowl_width - 25, bowl_y + bowl_height - 30],
                 fill=curd_color, outline=(230, 225, 215), width=1)
    
    # Curd surface smoothness
    draw.ellipse([bowl_x + 40, curd_start_y + 10, bowl_x + bowl_width - 40, curd_start_y + 50],
                 fill=(250, 248, 245))
    
    # Shine/highlight on curd
    draw.ellipse([bowl_x + 80, curd_start_y + 20, bowl_x + 180, curd_start_y + 80],
                 fill=(255, 255, 252, 150))
    
    # Decorative bowl patterns
    pattern_color = (255, 180, 100)
    for i in range(5):
        x_pos = bowl_x + 50 + i * 50
        draw.arc([x_pos - 20, bowl_y + 80, x_pos + 20, bowl_y + 130], 0, 180,
                fill=pattern_color, width=2)
    
    # Spoon
    spoon_x = bowl_x + bowl_width + 50
    spoon_y = bowl_y + 100
    
    # Spoon handle
    draw.line([(spoon_x - 30, spoon_y - 50), (spoon_x + 60, spoon_y + 100)],
              fill=(160, 85, 50), width=5)
    
    # Spoon bowl
    draw.ellipse([spoon_x - 25, spoon_y, spoon_x + 25, spoon_y + 40],
                 fill=(190, 110, 65), outline=(150, 80, 40), width=2)
    
    # Apply blur for smooth look
    img = img.filter(ImageFilter.GaussianBlur(radius=0.8))
    
    img.save('src/assets/dairy/curd.webp', 'WEBP', quality=95)
    print("✓ Created: curd.webp (realistic, no text)")

# Create images
print("Creating realistic images without text...\n")
os.makedirs('src/assets/dairy', exist_ok=True)
create_ghee_image_no_text()
create_curd_image_no_text()
print("\nDone! Clean images created!")
