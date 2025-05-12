# Artist Images Directory

This directory is for storing artist background images that will be used in the shareable Instagram graphics.

## How to Add Images

1. Name your images after the artist with hyphenated lowercase names:
   - For "Gabrielle Grace" use: `gabrielle-grace.jpeg`
   - For "Taylor Swift" use: `taylor-swift.jpeg`

2. Currently supported formats:
   - JPEG (.jpeg, .jpg)
   - PNG (.png)

3. Recommended image specifications:
   - Resolution: At least 1080px wide by 1920px tall (Instagram story dimensions)
   - Orientation: Portrait/vertical
   - Quality: High quality, but optimized for web
   - Content: Images with space for text overlay work best

If an artist image isn't found, the app will automatically fall back to a color pattern based on the artist's defined color theme in the data.

## Artist Logos

Artist logos should be placed in the main `/public/` directory and follow the naming convention:
`artist-name-logo.jpeg` (e.g., `gabrielle-grace-logo.jpeg`)

Logos will appear in the footer of the shareable image if they exist. 