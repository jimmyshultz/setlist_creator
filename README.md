# Setlist Creator

A responsive web application for fans to help artists select and arrange songs for upcoming concerts. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Responsive Design**: Works seamlessly on both desktop and mobile devices
- **Paper-themed Background**: Setlist appears on a paper-like background for a realistic feel
- **Drag and Drop Interface**: Intuitive drag and drop functionality to create and arrange setlists
- **Song Bank**: Browse available songs to add to the setlist
- **Real-time Updates**: See the total duration and song count as you build your setlist
- **Modern UI**: Clean, modern interface with smooth animations

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

## Usage

1. Browse the available songs in the Song Bank
2. Drag songs from the bank to the setlist on the right
3. Rearrange songs in your setlist by dragging them
4. Remove songs from your setlist by dragging them back to the song bank

## Customization

You can easily customize the application by:

- Modifying the artist name, concert date, and venue in the `page.tsx` file
- Adding your own songs to the `SAMPLE_SONGS` array in `page.tsx`
- Changing the styling in the CSS files and component classes

## Technologies Used

- **Next.js**: React framework for server-rendered applications
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **dnd-kit**: Modern drag and drop library for React

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [dnd-kit](https://dndkit.com/) for the drag and drop functionality
- [Tailwind CSS](https://tailwindcss.com/) for the styling
- [Next.js](https://nextjs.org/) for the application framework
