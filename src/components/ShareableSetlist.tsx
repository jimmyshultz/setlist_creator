import React, { useState } from 'react';
import { SongType } from './Song';
import { ColorTheme } from '@/utils/artistDataHelper';
import Image from 'next/image';

export interface ShareableSetlistProps {
  artistName: string;
  showDate: string;
  showVenue: string;
  tourName?: string;
  setlistSongs: SongType[];
  colorTheme: ColorTheme;
}

const ShareableSetlist = React.forwardRef<HTMLDivElement, ShareableSetlistProps>((
  { artistName, showDate, showVenue, tourName, setlistSongs, colorTheme }, 
  ref
) => {
  // State to track if the image failed to load
  const [imageLoaded, setImageLoaded] = useState<boolean>(true);
  const [imageError, setImageError] = useState<boolean>(false);
  
  // Check if the date is a range (contains a hyphen)
  const isDateRange = showDate.includes('-');
  
  // Determine what to display as the subtitle
  const displayLocation = isDateRange ? tourName : showVenue;
  
  // Extract color values from the colorTheme for inline styling
  const getPrimaryGradient = () => {
    const colors = colorTheme.primary.split(' ');
    const fromColor = colors.find(c => c.startsWith('from-'))?.replace('from-', '');
    const toColor = colors.find(c => c.startsWith('to-'))?.replace('to-', '');
    
    // Default colors if we can't parse the classes
    let fromHex = '#4f46e5'; // indigo-600
    let toHex = '#9333ea';   // purple-600
    
    // Convert tailwind class names to actual colors
    if (fromColor) {
      if (fromColor.startsWith('[') && fromColor.endsWith(']')) {
        // Handle custom colors like [hsl(199,41%,52%)]
        fromHex = fromColor.substring(1, fromColor.length - 1);
      } else if (fromColor === 'red-500') {
        fromHex = '#ef4444';
      } else if (fromColor === 'gray-900') {
        fromHex = '#111827';
      } else if (fromColor === 'yellow-600') {
        fromHex = '#ca8a04';
      }
    }
    
    if (toColor) {
      if (toColor.startsWith('[') && toColor.endsWith(']')) {
        // Handle custom colors like [hsl(199,41%,42%)]
        toHex = toColor.substring(1, toColor.length - 1);
      } else if (toColor === 'pink-600') {
        toHex = '#db2777';
      } else if (toColor === 'red-900') {
        toHex = '#7f1d1d';
      } else if (toColor === 'yellow-800') {
        toHex = '#854d0e';
      }
    }
    
    return `linear-gradient(to right, ${fromHex}, ${toHex})`;
  };
  
  const getSecondaryColor = () => {
    // Convert tailwind class to actual color
    switch (colorTheme.secondary) {
      case 'red-600': return '#dc2626';
      case 'red-700': return '#b91c1c';
      case 'blue-500': return '#3b82f6';
      case 'yellow-600': return '#ca8a04';
      case 'indigo-600': return '#4f46e5';
      default: return '#4f46e5'; // Default to indigo-600
    }
  };

  // Get artist image based on artist name
  const getArtistImage = () => {
    const artistId = artistName.toLowerCase().replace(/\s+/g, '-');
    return `/images/${artistId}.jpeg`;
  };
  
  // Handle image load error - set state to use color scheme instead
  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(false);
  };
  
  // Handle successful image load
  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };
  
  // Generate a nice pattern gradient background when no image is available
  const getColorBackground = () => {
    const gradient = getPrimaryGradient();
    const secondaryColor = getSecondaryColor();
    
    // Create a more interesting background with multiple gradients
    return {
      background: `
        ${gradient},
        radial-gradient(circle at 25% 25%, ${secondaryColor}22 0%, transparent 50%),
        radial-gradient(circle at 75% 75%, ${secondaryColor}22 0%, transparent 50%),
        linear-gradient(45deg, ${secondaryColor}11 25%, transparent 25%, transparent 75%, ${secondaryColor}11 75%, ${secondaryColor}11),
        linear-gradient(135deg, ${secondaryColor}11 25%, transparent 25%, transparent 75%, ${secondaryColor}11 75%, ${secondaryColor}11)
      `,
      backgroundSize: '100% 100%, 50% 50%, 50% 50%, 20px 20px, 20px 20px',
      backgroundPosition: '0 0, 0 0, 0 0, 0 0, 10px 10px',
    };
  };
  
  return (
    <div 
      ref={ref} 
      className="bg-white"
      style={{
        width: '1080px',
        height: '1920px',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      {/* Background: Either image or color theme */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
      }}>
        {!imageError ? (
          // Try to load artist image
          <img 
            src={getArtistImage()}
            alt={`${artistName} background`}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: 0.7, // Image opacity
            }}
            onError={handleImageError}
            onLoad={handleImageLoad}
          />
        ) : (
          // Fallback to color theme
          <div style={{
            width: '100%',
            height: '100%',
            ...getColorBackground(),
          }} />
        )}
        
        {/* Dark overlay gradient for better text readability */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 30%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.7) 100%)',
          zIndex: 1,
        }} />
      </div>
      
      {/* Content Container (sits above the image) */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* Header */}
        <div style={{
          background: `linear-gradient(to bottom, ${getPrimaryGradient()}, transparent)`,
          width: '100%',
          padding: '64px 32px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          color: 'white',
          textShadow: '0 2px 4px rgba(0,0,0,0.5)',
        }}>
          <h1 style={{
            fontSize: '70px',
            fontWeight: 'bold',
            marginBottom: '32px',
          }}>
            {artistName}'s Setlist
          </h1>
          
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            <p style={{ fontSize: '40px' }}>{showDate}</p>
            {displayLocation && <p style={{ fontSize: '30px', opacity: 0.9 }}>{displayLocation}</p>}
          </div>
        </div>
        
        {/* Setlist */}
        <div style={{
          flex: 1,
          padding: '64px 32px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.85)',
            borderRadius: '24px',
            padding: '32px',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.2)',
          }}>
            <h2 style={{
              fontSize: '50px',
              fontWeight: 'bold',
              color: '#111827',
              textAlign: 'center',
              marginBottom: '24px',
            }}>
              My Dream Setlist
            </h2>
            
            <div style={{ }}>
              {setlistSongs.map((song, index) => (
                <div key={song.id} style={{
                  padding: '20px 0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '24px',
                  borderBottom: index < setlistSongs.length - 1 ? '1px solid rgba(0,0,0,0.1)' : 'none',
                }}>
                  <div style={{
                    width: '40px',
                    textAlign: 'center',
                    color: getSecondaryColor(),
                    fontSize: '36px',
                    fontWeight: 'bold',
                    textShadow: '0 1px 2px rgba(0,0,0,0.2)',
                  }}>
                    {index + 1}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{
                      fontSize: '36px',
                      fontWeight: 600,
                      color: '#111827',
                    }}>
                      {song.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div style={{
          padding: '32px',
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}>
          <p style={{
            fontSize: '26px',
            color: 'white',
            textShadow: '0 2px 4px rgba(0,0,0,0.5)',
          }}>
            Created with Setlist Creator
          </p>
        </div>
      </div>
    </div>
  );
});

ShareableSetlist.displayName = 'ShareableSetlist';

export default ShareableSetlist; 