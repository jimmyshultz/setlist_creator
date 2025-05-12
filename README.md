# Setlist Creator

A responsive web application for fans to help artists select and arrange songs for upcoming concerts. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Responsive Design**: Works seamlessly on both desktop and mobile devices
- **Paper-themed Background**: Setlist appears on a paper-like background for a realistic feel
- **Drag and Drop Interface**: Intuitive drag and drop functionality to create and arrange setlists
- **Song Bank**: Browse available songs to add to the setlist
- **Customizable Song Limit**: Each artist can have a different maximum number of songs (defaults to 7)
- **Instagram Share Feature**: Generate a beautiful shareable image for Instagram stories
- **Artist Color Themes**: Each artist can have their own color scheme throughout the app
- **Artist Images & Logos**: Support for artist background images and logos on shareable graphics
- **Modern UI**: Clean, modern interface with smooth animations
- **Artist-specific Links**: Support for URL parameters to create custom links for different artists/shows

## Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/setlist-creator.git
cd setlist-creator
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Deployment

### Deploying to Vercel

This project includes a GitHub workflow to automatically deploy to Vercel whenever changes are pushed to the main branch.

#### Setup

1. Create a Vercel account and project:
   - Sign up at [vercel.com](https://vercel.com) if you don't have an account
   - Import your GitHub repository to create a new project
   - Complete the initial setup but don't worry about the build settings (they'll be handled by the workflow)

2. Get your Vercel tokens and IDs:
   - Vercel Organization ID: Find in Vercel Dashboard → Settings → General → Your Organization ID
   - Vercel Project ID: Find in Vercel Dashboard → Your Project → Settings → General → Project ID
   - Vercel Token: Create at Vercel Dashboard → Settings → Tokens

3. Add secrets to your GitHub repository:
   - Go to your GitHub repository → Settings → Secrets and variables → Actions
   - Add the following secrets:
     - `VERCEL_ORG_ID`: Your Vercel Organization ID
     - `VERCEL_PROJECT_ID`: Your Vercel Project ID
     - `VERCEL_TOKEN`: Your Vercel API token

4. Push to the `main` branch:
   - The GitHub workflow will automatically deploy your application to Vercel
   - You can also manually trigger the workflow from the Actions tab in your GitHub repository

Once deployed, your application will be available at the URL provided by Vercel, typically in the format: `https://your-project-name.vercel.app`

## Usage

1. Browse the available songs in the Song Bank
2. Drag songs from the bank to the setlist on the right
3. Rearrange songs in your setlist by dragging them
4. Remove songs from your setlist by dragging them back to the song bank
5. Once your setlist is complete, click "Share on Instagram" to generate a shareable image

## Instagram Sharing Feature

The app allows users to create beautiful shareable images for Instagram stories:

- Click "Share on Instagram" after completing your setlist
- The generated image includes the artist's name, event details, and your selected songs
- Download the image or copy it directly to your clipboard
- Images automatically use the artist's color scheme
- If available, the artist's background image and logo will be included

### Adding Artist Images and Logos

To add custom artist visuals:

1. For background images, add a JPEG file to `/public/images/` named after the artist (e.g., `gabrielle-grace.jpeg`)
2. For artist logos, add a JPEG file to `/public/` named with the `-logo` suffix (e.g., `gabrielle-grace-logo.jpeg`)

If images aren't available, the app will fall back to a color theme based on the artist's configuration.

## URL Parameters

The application supports artist-specific and show-specific URLs, allowing artists to share custom links with their fans:

```
http://yourdomain.com/?artist=artist-id&show=show-id
```

For example:
```
http://localhost:3000/?artist=taylor-swift&show=taylor-nyc-2025
http://localhost:3000/?artist=the-weeknd&show=weeknd-toronto-2025
http://localhost:3000/?artist=beyonce&show=beyonce-houston-2025
```

If no parameters are provided, or if the specified artist/show doesn't exist, the application will default to the first artist and show in the data.

## Customization

The application loads artist and show data from a JSON file. To customize:

1. Edit the `src/data/artists.json` file to add or modify artists, shows, and songs
2. Each artist can have multiple shows, and each show has its own song list
3. Define a `maxSongs` value for each show to customize the setlist size
4. Add a `colorTheme` object to each artist with `primary`, `secondary`, and `accent` colors
5. Make sure to provide unique IDs for artists, shows, and songs

Example artist configuration:
```json
{
  "id": "artist-id",
  "name": "Artist Name",
  "colorTheme": {
    "primary": "from-blue-500 to-indigo-600",
    "secondary": "blue-500",
    "accent": "indigo-400"
  },
  "shows": [
    {
      "id": "show-id",
      "date": "June 15, 2025",
      "venue": "Venue Name, City",
      "maxSongs": 10,
      "songs": [...]
    }
  ]
}
```

## Technologies Used

- **Next.js**: React framework for server-rendered applications
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **dnd-kit**: Modern drag and drop library for React
- **html2canvas**: For generating shareable images

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [dnd-kit](https://dndkit.com/) for the drag and drop functionality
- [Tailwind CSS](https://tailwindcss.com/) for the styling
- [Next.js](https://nextjs.org/) for the application framework
- [html2canvas](https://html2canvas.hertzen.com/) for image generation
