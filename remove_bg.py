import os
import sys
from rembg import remove, new_session
from PIL import Image

def process_new_photo():
    new_input_path = "C:/Users/HP/.gemini/antigravity/brain/f7ca316e-70e9-486a-9c3d-0949b42761ba/.user_uploaded/media_1794410405337_211638ae.jpg"
    dest_raw_path = os.path.abspath("frontend/public/profile-raw.jpg")
    output_public_path = os.path.abspath("frontend/public/profile-transparent.png")
    output_assets_path = os.path.abspath("frontend/src/assets/profile-transparent.png")
    
    print(f"Reading new uploaded photo from: {new_input_path}")
    if not os.path.exists(new_input_path):
        print("Error: Source photo not found!")
        sys.exit(1)
        
    input_img = Image.open(new_input_path)
    # Save a backup of raw image to public folder as profile-raw.jpg
    input_img.save(dest_raw_path, "JPEG", quality=95)
    print(f"Raw image size: {input_img.size}, mode: {input_img.mode}")
    
    print("Initializing u2netp session...")
    session = new_session("u2netp")
    
    print("Removing blue background...")
    output_img = remove(input_img, session=session)
    
    # Save high quality transparent PNG
    output_img.save(output_public_path, "PNG")
    output_img.save(output_assets_path, "PNG")
    print(f"Saved transparent PNG to {output_public_path}")
    print(f"Saved transparent PNG to {output_assets_path}")
    
    # Verify transparency
    alpha = output_img.split()[-1]
    extrema = alpha.getextrema()
    print(f"Alpha channel extrema (min, max): {extrema}")
    print(f"Corner (0, 0) alpha: {output_img.getpixel((0, 0))[-1]}")
    print("Background removal successfully finished!")

if __name__ == "__main__":
    process_new_photo()
