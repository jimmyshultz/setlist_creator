import React, { useState } from 'react';
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

// Base64 encoded fallback logo for Gabrielle Grace (small placeholder)
const GABRIELLE_GRACE_LOGO_FALLBACK = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAAAoCAYAAAAcwQPnAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAVDSURBVHgB7ZtfbFNVGMC/c+9tV4ZscYsTErKxPajJIrCYGDYMm+sDiQZJnCaLJsYXeXDGF40mE01MjImJvBiHeHAkUV6IMdE4xmZC5GFuTsaYW9iGBPgzB1m7tfd+fud27da17b23vX/Mne9X0nPuuadnbfPdc77vfOcQiUQikUgk1QNDlUDoU0eB7qrWyChk1SG23J4kybRTLsZIMcEYz/R2DV1Cb3eQJiUW5/tgjMQyKs95u4dOIRZl0pYrKpcU9ULu2F9fgqGjpqO8z5Ol/yP4nIUQPu7ftbKVhAKK1sOvvYhV2qwTF/Uoavd4b1eIsLCFNmBcHEJ3Yd1GEzwfDtd5LFWM+zuCxNg8KcKLGNjL6DHF7Rq6SPaQhFiwYhH3hYNTm4zAkWYYVxFRH8HdZ8k+nPk7wz2fvIqm5l1kF9LZPuzVY9jyjNJkA2zZnqAKM5bI/LHmYnQMLfMbE0yfqrSoEMXx5Wj+EAQzIxFBJsNrfA1WX5jd2wDlxMfbg8dVr7EefVu8GJfcv/8YIHsoxGKMQQT6kQ32E/ykYAFb/u2PzaA9cqP7fj05wKnwEv4+wd0yjv0RdJOpKHpOohxDywKIcouCIhfZeITHk6f+H1/FVHnB5zYmjDuYxsUzNEbXyB75LrYIxMQCQ0iLnCHFUMo4O4OBUl9F4BbBuT2oKCzCY4yEvIr7i5KVZAY9yCwHCxe1bHklTYXNjTMkUYS3vxekQXxOHF14kPQZRANEgXeHg9NjtEEIKzQvQ5qcwIZ+NbvgQnrHf6bKRCO1yzUVCpI/FWpMDUL8CqJBIpPXBcPnqoR4e3rDO9ExkhQGKVX2ylTIlcUm+sKvWZQCeWLRq6FRvO+jUknsT4Ubb0JcgKCkj1yRFbCZqnxLiKFLrK6iXvt5a76wwDLZZMKKfEUO/JWXKaEqVBIJPP0wKY5bK9CG6MpThDDTWvvzc8QTx5/6n9ViN7Cxwvx1Jt3QRQ4n1u6ZTxCNE+Oqa93Z1UuWINY4lXtv4Vry62QTFcqmMWRdHnRFWWuYYXMXaL7Oe3dPEIXvcecPqFQqLZ3sYv4BtN1UWEn6hcgq6CJ20SdNQKxRzP8fO2vYwgLIE+shUd9nM0HfXLbFRfXwlTTqyLbPfARmGIqJNYxRN0w2UbmCYQlcH5xtA7HiyHJnqjhrZbawAF2xYrHPiYoitEwkX7NttjCDCNpENqCLlTDdxVoHAysmFmbUB9EmqcwUZrj1Ig6Kq7OLTIllTdNSCu8ij9D5IK5Y+2g9aJkpzCiiC5YtaFPpprWKFBh9U18ysQDhxtWgJ1Yd5obaxXZhkWnfLlOwZQvLVwsD+QvEdIvOLRy3w+q/vWL1wCvwUVEX5/2DI+OTrydRsS9tN5uwSHZBkfnIKJdYrJD1zfW9RxfMWYl67PfoIqyc/KsDbKRJzN5jNnGc3PdxPV4w9pYYH3xSN0Kv6H46NJmZZ4Yx4IhpWwjOQVuuoUXCgQ0LGZEzJEm/7g81uyA8E4ZYxGc7tLzXPcfhcBynCvJUbfqoTmhLhW/gjI1BbMCRIz1dQ+dJYnxb0MU2dsPxfWCDsGI9WGRpIJFXJLKPi6lOfH6xZDEqoOSJgWaJeUKMp5sLn3v9Lym1gu3bZUoFC459vPvDgGgNHSEJCt7wj/dJSqWWt8vYQb/eRCKRSCQSiUQikUgkZfM/14tifJbxZCIAAAAASUVORK5CYII=";

const ShareableSetlist = React.forwardRef<HTMLDivElement, ShareableSetlistProps>((
  { artistName, showDate, showVenue, tourName, setlistSongs, colorTheme }, 
  ref
) => {
  // State to track if the image failed to load
  const [imageError, setImageError] = useState<boolean>(false);
  
  // State to track if the logo failed to load - assume it works until proven otherwise
  const [logoError, setLogoError] = useState<boolean>(false);
  
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
  
  // Get artist logo based on artist name
  const getArtistLogo = () => {
    const artistId = artistName.toLowerCase().replace(/\s+/g, '-');
    return `/${artistId}-logo.jpeg`;
  };
  
  // Get alternative logo formats - try different extensions if the main one fails
  const getAlternativeLogoUrls = () => {
    const artistId = artistName.toLowerCase().replace(/\s+/g, '-');
    return [
      `/${artistId}-logo.png`,
      `/${artistId}-logo.jpg`,
      `/images/${artistId}-logo.jpeg`,
      `/images/${artistId}-logo.png`,
      `/images/${artistId}-logo.jpg`
    ];
  };
  
  // Logo error counter to try alternative formats
  const [logoErrorCount, setLogoErrorCount] = useState<number>(0);
  const alternativeLogos = getAlternativeLogoUrls();
  
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
  
  // Handle logo load error - try alternative formats before giving up
  const handleLogoError = () => {
    // Check if we have alternative formats to try
    if (logoErrorCount < alternativeLogos.length) {
      setLogoErrorCount(prev => prev + 1);
    } else {
      // We've tried all formats, hide the logo
      setLogoError(true);
    }
  };
  
  // Get current logo URL based on error count
  const getCurrentLogoUrl = () => {
    if (logoErrorCount === 0) {
      return getArtistLogo();
    }
    return alternativeLogos[logoErrorCount - 1];
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
    return {
      background: `
        ${gradient},
        radial-gradient(circle at ${25 + (artistNameSum % 30)}% ${20 + (artistNameSum % 40)}%, ${secondaryColor}33 0%, transparent 60%),
        radial-gradient(circle at ${70 - (artistNameSum % 20)}% ${65 + (artistNameSum % 25)}%, ${secondaryColor}22 0%, transparent 50%),
        linear-gradient(${45 + artistNameSum}deg, ${secondaryColor}11 25%, transparent 25%, transparent 75%, ${secondaryColor}11 75%, ${secondaryColor}11),
        linear-gradient(${135 - (artistNameSum % 45)}deg, ${secondaryColor}11 25%, transparent 25%, transparent 75%, ${secondaryColor}11 75%, ${secondaryColor}11)
      `,
      backgroundSize: '100% 100%, 60% 60%, 50% 50%, 25px 25px, 25px 25px',
      backgroundPosition: '0 0, 0 0, 0 0, 0 0, 10px 10px',
    };
  };
  
  // Function to determine if we should use the embedded fallback logo
  const shouldUseEmbeddedLogo = () => {
    // If we've tried all other formats and failed, use the embedded logo
    // But only for Gabrielle Grace (since that's the only one we have encoded)
    return logoError && artistName.toLowerCase().includes('gabrielle grace');
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
        <div style={{
          padding: '32px',
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}>
          {/* Artist Logo (with multiple format fallbacks) */}
          {!logoError && (
            <img 
              src={getCurrentLogoUrl()}
              alt={`${artistName} logo`}
              className="artist-logo"
              style={{
                maxWidth: '200px',
                maxHeight: '80px',
                objectFit: 'contain',
                display: 'block',
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))',
                marginBottom: '16px',
              }}
              onError={handleLogoError}
            />
          )}
          
          {/* Hardcoded fallback for Gabrielle Grace */}
          {shouldUseEmbeddedLogo() && (
            <img 
              src={GABRIELLE_GRACE_LOGO_FALLBACK}
              alt={`${artistName} logo (fallback)`}
              className="artist-logo-fallback"
              style={{
                maxWidth: '200px',
                maxHeight: '80px',
                objectFit: 'contain',
                display: 'block', 
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))',
                marginBottom: '16px',
              }}
            />
          )}
          
          <p style={{
            fontSize: '26px',
            color: 'white',
            textShadow: '0 2px 4px rgba(0,0,0,0.5)',
            letterSpacing: '0.5px',
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