import React, { useState, useEffect } from 'react';
import { SongType } from './Song';
import { ColorTheme } from '@/utils/artistDataHelper';

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
  const [imageError, setImageError] = useState<boolean>(false);
  

  
  // Check for mobile devices
  const [isMobile, setIsMobile] = useState<boolean>(false);
  
  // Detect mobile on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkMobile = () => {
        const mobile = window.innerWidth < 768 || 
                      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        setIsMobile(mobile);
      };
      
      checkMobile();
      window.addEventListener('resize', checkMobile);
      
      return () => {
        window.removeEventListener('resize', checkMobile);
      };
    }
  }, []);
  
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
  

  
  // Get alternative background image formats (similar to logo)
  const getAlternativeBackgroundUrls = () => {
    const artistId = artistName.toLowerCase().replace(/\s+/g, '-');
    return [
      `/images/${artistId}.png`,
      `/images/${artistId}.jpg`
    ];
  };
  
  // Background error counter
  const [backgroundErrorCount, setBackgroundErrorCount] = useState<number>(0);
  const alternativeBackgrounds = getAlternativeBackgroundUrls();
  
  // Get current background URL based on error count
  const getCurrentBackgroundUrl = () => {
    if (backgroundErrorCount === 0) {
      return getArtistImage();
    } else if (backgroundErrorCount <= alternativeBackgrounds.length) {
      return alternativeBackgrounds[backgroundErrorCount - 1];
    } else {
      // Only use default image for Gabrielle Grace
      if (artistName.toLowerCase().includes('gabrielle grace')) {
        return '/images/default-artist.jpeg';
      }
      // For other artists, return an empty string to trigger the color theme fallback
      return '';
    }
  };
  
  // Handle image load error - try alternatives before showing gradient
  const handleImageError = () => {
    if (backgroundErrorCount < alternativeBackgrounds.length + 1) {
      setBackgroundErrorCount(prev => prev + 1);
    } else {
      // Show color gradient fallback
      setImageError(true);
    }
  };
  
  // Handle successful image load
  const handleImageLoad = () => {
    setImageError(false);
  };
  

  
  // Generate a nice pattern gradient background when no image is available
  const getColorBackground = () => {
    const gradient = getPrimaryGradient();
    const secondaryColor = getSecondaryColor();
    
    // Parse the artist name to generate some variability in the pattern
    const artistNameSum = Array.from(artistName).reduce(
      (sum, char) => sum + char.charCodeAt(0), 0
    ) % 100;
    
    // Create a more interesting background with multiple gradients
    // Use the artistNameSum to create variation between different artists
    // Apply slightly different pattern on mobile
    return {
      background: `
        ${gradient},
        radial-gradient(circle at ${25 + (artistNameSum % 30)}% ${20 + (artistNameSum % 40)}%, ${secondaryColor}33 0%, transparent ${isMobile ? 50 : 60}%),
        radial-gradient(circle at ${70 - (artistNameSum % 20)}% ${65 + (artistNameSum % 25)}%, ${secondaryColor}22 0%, transparent 50%),
        linear-gradient(${45 + artistNameSum}deg, ${secondaryColor}11 25%, transparent 25%, transparent 75%, ${secondaryColor}11 75%, ${secondaryColor}11),
        linear-gradient(${135 - (artistNameSum % 45)}deg, ${secondaryColor}11 25%, transparent 25%, transparent 75%, ${secondaryColor}11 75%, ${secondaryColor}11)
      `,
      backgroundSize: `100% 100%, 60% 60%, 50% 50%, ${isMobile ? '20px 20px' : '25px 25px'}, ${isMobile ? '20px 20px' : '25px 25px'}`,
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
        {!imageError && getCurrentBackgroundUrl() ? (
          // Try to load artist image with fallbacks
          <img 
            src={getCurrentBackgroundUrl()}
            alt={`${artistName} background`}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: 0.7, // Image opacity
            }}
            onError={handleImageError}
            onLoad={handleImageLoad}
            crossOrigin="anonymous"
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
            {artistName}&apos;s Setlist
          </h1>
          
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            <p style={{ fontSize: '40px' }}>{showDate}</p>
            {displayLocation && <p style={{ 
              fontSize: '30px', 
              opacity: 0.9, 
              letterSpacing: '0.5px',
              lineHeight: 1.3
            }}>{displayLocation}</p>}
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
                      letterSpacing: '0.3px',
                      lineHeight: 1.2
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
        <div 
          style={{
            padding: '32px',
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
          data-footer="true"
        >
          <p style={{
            fontSize: '26px',
            color: 'white',
            textShadow: '0 2px 4px rgba(0,0,0,0.5)',
            letterSpacing: '0.5px',
          }}>
            Created with Setlist Sequence
          </p>
        </div>
      </div>
    </div>
  );
});

ShareableSetlist.displayName = 'ShareableSetlist';

export default ShareableSetlist; 