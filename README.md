# Setlist Sequence

A responsive web application that allows fans to create and arrange setlists for their favorite artists' upcoming concerts. Artists can share custom links with their fans, who can then drag and drop songs to create the perfect setlist and share it on social media.

## 🎵 Features

- **URL-Based Navigation**: Each artist and show has a unique URL (e.g., `/taylor-swift/taylor-nyc-2025`)
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Paper-themed Interface**: Setlist appears on a realistic paper background with horizontal lines
- **Drag and Drop**: Intuitive interface to move songs between the song bank and setlist
- **7-Song Limit**: Enforced setlist limit with visual feedback and completion states
- **Instagram Sharing**: Generate beautiful shareable images for social media
- **Artist Branding**: Custom color themes and branding for each artist
- **Real-time Feedback**: Progress indicators and disabled states for better UX
- **Optimized Performance**: Fast compilation with Turbopack and SWC optimizations

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm (comes with Node.js)

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/yourusername/setlist_creator.git
cd setlist_creator
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start the development server:**
```bash
npm run dev
```

4. **Open your browser:**
   - Navigate to [http://localhost:3000](http://localhost:3000)
   - Or try a specific artist/show: [http://localhost:3000/taylor-swift/taylor-nyc-2025](http://localhost:3000/taylor-swift/taylor-nyc-2025)

## 🌐 URL Structure

The application uses dynamic routing to create unique links for each artist and show:

```
https://yourdomain.com/[artist]/[show]
```

### Available Routes

Based on the current data structure:

- `/taylor-swift/taylor-la-2025` - Taylor Swift at SoFi Stadium
- `/taylor-swift/taylor-nyc-2025` - Taylor Swift at Madison Square Garden  
- `/the-weeknd/weeknd-toronto-2025` - The Weeknd at Rogers Centre
- `/beyonce/beyonce-houston-2025` - Beyoncé at NRG Stadium

### Fallback Behavior

- If an invalid artist/show combination is accessed, the app redirects to the first available artist/show
- The home page (`/`) displays a landing page with links to all available setlist sequences

## 🎨 How It Works

1. **Artist shares a link** with their fans (e.g., `/taylor-swift/taylor-nyc-2025`)
2. **Fans visit the link** and see the artist's song bank and empty setlist
3. **Fans drag songs** from the bank to create their ideal 7-song setlist
4. **Fans can reorder** songs within the setlist by dragging
5. **Once complete**, fans can share their setlist on Instagram

### User Interface

- **Song Bank (Left)**: Available songs for the show
- **Setlist (Right)**: Paper-themed area where fans build their 7-song setlist
- **Progress Indicator**: Shows how many songs have been added (X/7)
- **Completion Message**: Appears when setlist is complete
- **Share Button**: Generates Instagram-ready image

## 📁 Project Structure

```
setlist_creator/
├── src/
│   ├── app/
│   │   ├── [artist]/
│   │   │   └── [show]/
│   │   │       └── page.tsx          # Dynamic setlist page
│   │   ├── page.tsx                  # Landing page
│   │   ├── layout.tsx                # Root layout
│   │   └── globals.css               # Global styles
│   ├── components/
│   │   ├── Header.tsx                # App header
│   │   ├── SongBank.tsx              # Song selection area
│   │   ├── Setlist.tsx               # Setlist creation area
│   │   └── Song.tsx                  # Individual song component
│   ├── data/
│   │   └── artists.json              # Artist and show data
│   └── utils/
│       └── artistDataHelper.ts       # Data access utilities
├── public/
│   └── images/                       # Artist images and logos
├── next.config.ts                    # Optimized Next.js configuration
└── package.json
```

## 🛠 Configuration

### Adding New Artists/Shows

Edit `src/data/artists.json` to add new artists or shows:

```json
{
  "id": "artist-slug",
  "name": "Artist Name",
  "colorTheme": {
    "primary": "from-blue-500 to-indigo-600",
    "secondary": "blue-500", 
    "accent": "indigo-400"
  },
  "shows": [
    {
      "id": "show-slug",
      "date": "March 15, 2025",
      "venue": "Venue Name, City",
      "maxSongs": 7,
      "songs": [
        {
          "id": "song-1",
          "title": "Song Title",
          "album": "Album Name"
        }
      ]
    }
  ]
}
```

### Artist Branding

- **Background Images**: Add to `/public/images/artist-slug.jpeg`
- **Logos**: Add to `/public/artist-slug-logo.jpeg`
- **Color Themes**: Define in the artist's `colorTheme` object

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect your repository** to Vercel
2. **Set up environment variables** (if needed)
3. **Deploy** - Vercel will automatically build and deploy

The optimized Next.js configuration includes:
- Turbopack for faster builds
- SWC minification
- Image optimization (WebP, AVIF)
- Performance optimizations

### Manual Deployment

```bash
npm run build
npm start
```

## 🔧 Technologies

- **[Next.js 15.3.1](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS 3.4.1](https://tailwindcss.com/)** - Utility-first CSS framework
- **[@dnd-kit](https://dndkit.com/)** - Modern drag and drop for React
- **[html2canvas](https://html2canvas.hertzen.com/)** - Screenshot generation
- **[Vercel Analytics](https://vercel.com/analytics)** - Performance monitoring

## 📱 Browser Support

- Chrome/Edge 88+
- Firefox 85+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **[@dnd-kit](https://dndkit.com/)** for the excellent drag and drop functionality
- **[Tailwind CSS](https://tailwindcss.com/)** for the utility-first styling approach
- **[Next.js](https://nextjs.org/)** for the powerful React framework
- **[Vercel](https://vercel.com/)** for seamless deployment and analytics
