from PIL import Image, ImageDraw, ImageFont

def generate_image():
    # Image dimensions
    width, height = 1200, 900
    
    # Colors
    bg_color = (17, 24, 39) # Dark blue-gray #111827
    text_color = (243, 244, 246) # Light gray #f3f4f6
    accent_color = (249, 115, 22) # Orange #f97316
    muted_color = (156, 163, 175) # Gray #9ca3af

    # Create image
    img = Image.new('RGB', (width, height), color=bg_color)
    d = ImageDraw.Draw(img)

    # Try to load a nicer font, fallback to default
    try:
        # Windows typically has segoeui
        title_font = ImageFont.truetype("segoeui.ttf", 40)
        heading_font = ImageFont.truetype("segoeuib.ttf", 24)
        text_font = ImageFont.truetype("segoeui.ttf", 18)
    except IOError:
        try:
            # Fallback to arial
            title_font = ImageFont.truetype("arial.ttf", 40)
            heading_font = ImageFont.truetype("arialbd.ttf", 24)
            text_font = ImageFont.truetype("arial.ttf", 18)
        except IOError:
            title_font = ImageFont.load_default()
            heading_font = ImageFont.load_default()
            text_font = ImageFont.load_default()

    # Title
    title = "10 Innovative Feature Ideas for Sterling"
    d.text((60, 40), title, fill=accent_color, font=title_font)
    
    # Draw a line under title
    d.line([(60, 100), (1140, 100)], fill=accent_color, width=3)

    ideas = [
        ("1. Interactive 3D Equipment Viewer", "Allow clients to click, drag, and rotate 3D models of heavy machinery or electrical panels directly in the browser."),
        ("2. Isometric Facility Map", "An interactive 3D map of a factory or hospital that highlights specific Sterling services when hovered over different areas."),
        ("3. 360° Virtual Project Tours", "Immersive 360-degree interactive panoramas of completed high-voltage electrical setups or medical gas pipeline systems."),
        ("4. Automated Project Estimator", "An interactive questionnaire where potential clients input facility size and industry to get a high-level service estimate."),
        ("5. Secure Client Portal", "A login area for active clients to track real-time project progress, view daily logs, and download inspection certificates."),
        ("6. ROI & Efficiency Calculator", "A tool for factory owners to calculate long-term savings by upgrading to Sterling's maintenance and electrical solutions."),
        ("7. Live Safety Record Tracker", "A real-time counter highlighting 'Days Without a Major Incident' across all active sites to build trust."),
        ("8. Interactive Timeline of Growth", "An animated, scroll-triggered timeline visually walking users through milestones, certifications, and major projects."),
        ("9. Industry-Specific Landing Pages", "Dynamic routing that tailors content (e.g., Medical Infrastructure vs Heavy Fabrication) based on the visitor's industry."),
        ("10. AI-Powered Technical Assistant", "An intelligent chatbot trained on Sterling's services and safety standards to answer queries and pre-qualify leads.")
    ]

    y_offset = 140
    for heading, desc in ideas:
        # Draw accent block
        d.rectangle([(60, y_offset), (66, y_offset + 50)], fill=accent_color)
        
        # Heading
        d.text((85, y_offset - 2), heading, fill=text_color, font=heading_font)
        
        # Description
        d.text((85, y_offset + 32), desc, fill=muted_color, font=text_font)
        
        y_offset += 75

    img.save("10_Ideas.png")
    print("Saved 10_Ideas.png successfully!")

if __name__ == "__main__":
    generate_image()
