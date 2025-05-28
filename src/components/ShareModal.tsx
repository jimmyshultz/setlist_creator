import React, { useState, useRef, useEffect, useCallback } from 'react';
import html2canvas from 'html2canvas';
import ShareableSetlist from './ShareableSetlist';
import { SongType } from './Song';
import { ColorTheme } from '@/utils/artistDataHelper';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  artistName: string;
  showDate: string;
  showVenue: string;
  tourName?: string;
  setlistSongs: SongType[];
  colorTheme: ColorTheme;
}

const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  artistName,
  showDate,
  showVenue,
  tourName,
  setlistSongs,
  colorTheme
}) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [clipboardSupported, setClipboardSupported] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const shareableRef = useRef<HTMLDivElement>(null);
  const [logoPreloaded, setLogoPreloaded] = useState<boolean>(false);
  
  // Detect mobile devices
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
  
  // Check if we need to use inline styles for custom HSL colors
  const usesCustomColors = colorTheme?.primary?.includes('[hsl');
  
  // Extract color values from the colorTheme for inline styling
  const getPrimaryGradient = () => {
    if (!colorTheme?.primary) {
      return 'linear-gradient(to right, #4f46e5, #9333ea)'; // Default gradient
    }
    
    const colors = colorTheme.primary.split(' ');
    const fromColor = colors.find(c => c.startsWith('from-'))?.replace('from-', '');
    const toColor = colors.find(c => c.startsWith('to-'))?.replace('to-', '');
    
    if (!fromColor || !toColor) {
      return 'linear-gradient(to right, #4f46e5, #9333ea)'; // Default gradient
    }
    
    // Default colors
    let fromHex = '#4f46e5'; // indigo-600
    let toHex = '#9333ea';   // purple-600
    
    // Convert tailwind class names to actual colors
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
    
    if (toColor.startsWith('[') && toColor.endsWith(']')) {
      // Handle custom colors like [hsl(199,41%,42%)]
      toHex = toColor.substring(1, toColor.length - 1);
    } else if (toColor === 'pink-600') {
      toHex = '#db2777';
    } else if (toColor === 'red-900') {
      toHex = '#7f1d1d';
    } else if (toColor === 'yellow-800') {
      toHex = '#854d0e';
    } else if (toColor === 'purple-600') {
      toHex = '#9333ea';
    }
    
    return `linear-gradient(to right, ${fromHex}, ${toHex})`;
  };
  
  // Helper function to get gradient style for buttons
  const getGradientStyle = () => {
    const colors = colorTheme.primary.split(' ');
    const fromColor = colors.find(c => c.startsWith('from-'))?.replace('from-', '');
    const toColor = colors.find(c => c.startsWith('to-'))?.replace('to-', '');
    
    // Default classes if we can't parse
    if (!fromColor || !toColor) {
      return 'from-indigo-600 to-purple-600';
    }
    
    return colorTheme.primary;
  };
  
  // Get secondary color class
  const getSecondaryColorClass = () => {
    return colorTheme.secondary || 'indigo-600';
  };
  
  // Get secondary color value
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
  
  // Check if clipboard API is supported
  useEffect(() => {
    if (isMobile) {
      // On mobile, we check for basic clipboard support for text
      setClipboardSupported(
        typeof navigator !== 'undefined' && 
        navigator.clipboard !== undefined &&
        typeof navigator.clipboard.writeText === 'function'
      );
    } else {
      // On desktop, we check for full clipboard API with image support
      setClipboardSupported(
        typeof navigator !== 'undefined' && 
        navigator.clipboard !== undefined &&
        typeof navigator.clipboard.write === 'function'
      );
    }
  }, [isMobile]);

  // Preload the artist logo
  useEffect(() => {
    if (isOpen) {
      const artistId = artistName.toLowerCase().replace(/\s+/g, '-');
      const logoUrl = `/${artistId}-logo.jpeg`;
      
      // Preload the logo
      const img = new Image();
      img.onload = () => {
        console.log('Logo preloaded successfully');
        setLogoPreloaded(true);
      };
      img.onerror = () => {
        console.log('Logo failed to preload');
        setLogoPreloaded(true); // Continue anyway
      };
      img.src = logoUrl;
    }
  }, [isOpen, artistName]);

  // Define generateImage with useCallback to avoid dependency issues
  const generateImage = useCallback(async () => {
    if (!shareableRef.current) return;
    
    setIsLoading(true);
    
    try {
      // Ensure all images are fully loaded before capturing
      const loadAllImages = async () => {
        if (!shareableRef.current) return;
        
        const container = shareableRef.current;
        const images = Array.from(container.querySelectorAll('img'));
        
        // Force all images to be fully loaded
        await Promise.all(
          images.map(img => {
            return new Promise((resolve) => {
              if (img.complete && img.naturalHeight !== 0) {
                resolve(true);
                return;
              }
              
              // Ensure crossOrigin is set for CORS images
              img.crossOrigin = 'anonymous';
              
              // Set up event handlers
              img.onload = () => resolve(true);
              img.onerror = () => {
                // Don't hide images on error at this stage
                // Let the component's own error handlers deal with it
                resolve(false);
              };
              
              // Force reload
              const currentSrc = img.src;
              img.src = '';
              img.src = currentSrc;
            });
          })
        );
        
        // Extra delay to ensure rendering is complete
        // Longer delay on mobile devices
        await new Promise(resolve => setTimeout(resolve, isMobile ? 2000 : 1000));
      };
      
      // Wait for images to load
      await loadAllImages();
      
      // Adjust quality based on device type
      const scale = isMobile ? 1.5 : 2;
      
      const canvas = await html2canvas(shareableRef.current, {
        scale: scale,
        backgroundColor: 'white',
        logging: true, // Enable logging for debugging
        useCORS: true,
        allowTaint: true,
        imageTimeout: 15000, // Longer timeout for image loading
        onclone: (doc) => {
          // Make sure the element isn't scaled in the clone
          const el = doc.querySelector('[data-shareable]');
          if (el) {
            // Remove any transforms that might affect rendering
            (el as HTMLElement).style.transform = 'none';
            (el as HTMLElement).style.width = '1080px';
            (el as HTMLElement).style.height = '1920px';
            
            // Ensure all images are properly loaded in the clone
            const images = el.querySelectorAll('img');
            images.forEach(img => {
              // Set crossOrigin for all images
              img.crossOrigin = "anonymous";
              
              // Make sure all images remain visible
              img.style.opacity = '1';
              img.style.display = 'block';
              
              // Force visibility on mobile
              if (isMobile) {
                // Additional styles to ensure visibility on mobile
                img.style.position = 'relative';
                img.style.zIndex = '10';
              }
            });
            
            // Add special forced visibility for logos
            const logos = el.querySelectorAll('.artist-logo, .artist-logo-fallback');
            logos.forEach(logo => {
              (logo as HTMLElement).style.display = 'block';
              (logo as HTMLElement).style.visibility = 'visible';
              (logo as HTMLElement).style.opacity = '1';
              
              // On mobile, ensure footer visibility
              if (isMobile) {
                // Force the logo to be visible with stronger styles
                (logo as HTMLElement).style.position = 'relative';
                (logo as HTMLElement).style.zIndex = '100';
              }
            });
            
            // Ensure footer is visible on mobile
            if (isMobile) {
              const footer = el.querySelector('[data-footer="true"]');
              if (footer) {
                (footer as HTMLElement).style.position = 'relative';
                (footer as HTMLElement).style.zIndex = '50';
                (footer as HTMLElement).style.bottom = '0';
                (footer as HTMLElement).style.opacity = '1';
                (footer as HTMLElement).style.visibility = 'visible';
                (footer as HTMLElement).style.display = 'flex';
                
                // Set a background to make sure it stands out
                (footer as HTMLElement).style.backgroundColor = 'rgba(0,0,0,0.6)';
              }
            }
          }
        }
      });
      
      const url = canvas.toDataURL('image/png');
      setImageUrl(url);
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      setIsLoading(false);
    }
  }, [isMobile]);

  // Generate image when modal opens
  useEffect(() => {
    if (isOpen && shareableRef.current && !imageUrl && logoPreloaded) {
      generateImage();
    }
  }, [isOpen, imageUrl, logoPreloaded, generateImage]);

  // Reset states when modal closes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setImageUrl(null);
        setCopySuccess(false);
      }, 300);
    }
  }, [isOpen]);

  const downloadImage = () => {
    if (!imageUrl) return;
    
    const artistSlug = artistName.toLowerCase().replace(/\s+/g, '-');
    const filename = `${artistSlug}-setlist.png`;
    
    if (isMobile) {
      // On mobile, open image in a new tab with instructions
      const newTab = window.open();
      if (newTab) {
        newTab.document.write(`
          <html>
            <head>
              <title>Save Your Setlist Image</title>
              <meta name="viewport" content="width=device-width, initial-scale=1">
              <style>
                body { 
                  font-family: system-ui, sans-serif; 
                  margin: 0; 
                  padding: 20px; 
                  text-align: center; 
                  background: #f5f5f7;
                }
                img { 
                  max-width: 100%; 
                  height: auto; 
                  margin-bottom: 20px;
                  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                }
                .instructions {
                  background: white;
                  border-radius: 10px;
                  padding: 15px;
                  margin-bottom: 20px;
                  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
                }
                h2 { color: #333; }
              </style>
            </head>
            <body>
              <div class="instructions">
                <h2>Your Setlist Image</h2>
                <p>Press and hold on the image to save it to your device.</p>
              </div>
              <img src="${imageUrl}" alt="Setlist for ${artistName}">
            </body>
          </html>
        `);
        newTab.document.close();
      }
    } else {
      // Desktop download method
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };
  
  const copyImageToClipboard = async () => {
    if (!imageUrl || !clipboardSupported) return;
    
    try {
      if (isMobile) {
        // On mobile, copy a text version (most mobile browsers don't support image clipboard)
        await navigator.clipboard.writeText(
          `Check out my dream setlist for ${artistName}! Create your own at setlistsequence.com`
        );
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      } else {
        // Desktop clipboard method for image copying
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        await navigator.clipboard.write([
          new ClipboardItem({
            [blob.type]: blob
          })
        ]);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      }
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      // Try text fallback even on desktop if the image clipboard fails
      try {
        await navigator.clipboard.writeText(
          `Check out my dream setlist for ${artistName}! Create your own at setlistsequence.com`
        );
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      } catch (fallbackError) {
        console.error('Even text clipboard failed:', fallbackError);
      }
    }
  };

  // Handle native mobile share if available
  const handleNativeShare = async () => {
    if (!imageUrl) return;
    
    try {
      if (navigator.share) {
        // Try to share the image if the device supports it
        try {
          const response = await fetch(imageUrl);
          const blob = await response.blob();
          const file = new File([blob], `${artistName.toLowerCase().replace(/\s+/g, '-')}-setlist.png`, {
            type: 'image/png'
          });
          
          await navigator.share({
            title: `My setlist for ${artistName}`,
            text: `Check out my dream setlist for ${artistName}!`,
            files: [file]
          });
        } catch (imageShareError) {
          // Fallback to sharing just text
          console.log('Image sharing failed, falling back to text', imageShareError);
          await navigator.share({
            title: `My setlist for ${artistName}`,
            text: `Check out my dream setlist for ${artistName}! Create your own at setlistsequence.com`
          });
        }
      }
    } catch (error) {
      console.error('Error using native share:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col relative z-10">
        <div 
          className={!usesCustomColors ? 
            `bg-gradient-to-r ${getGradientStyle()} text-white p-4 flex justify-between items-center` : 
            'text-white p-4 flex justify-between items-center'
          }
          style={usesCustomColors ? { background: getPrimaryGradient() } : undefined}
        >
          <h3 className="text-lg font-semibold">Share Your Setlist</h3>
          <button onClick={onClose} className="text-white hover:text-opacity-80">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="flex-1 overflow-auto p-6">
          <div className="flex flex-col items-center">
            {/* Hidden shareable content that will be captured */}
            <div 
              className="sr-only overflow-hidden" 
              aria-hidden="true"
              style={{ width: '1px', height: '1px', position: 'absolute', top: '-9999px', left: '-9999px' }}
            >
              <div 
                ref={shareableRef} 
                data-shareable="true"
                style={{
                  transform: 'scale(0.25)', 
                  transformOrigin: 'top left',
                  width: '1080px',
                  height: '1920px',
                  position: 'absolute',
                  top: 0,
                  left: 0
                }}
              >
                <ShareableSetlist
                  artistName={artistName}
                  showDate={showDate}
                  showVenue={showVenue}
                  tourName={tourName}
                  setlistSongs={setlistSongs}
                  colorTheme={colorTheme}
                />
              </div>
            </div>
            
            {/* Preview of generated image */}
            {imageUrl ? (
              <div className="my-4 border rounded-lg overflow-hidden shadow-lg">
                <div className="w-full overflow-auto" style={{ maxHeight: '60vh' }}>
                  <img 
                    src={imageUrl} 
                    alt="Shareable setlist preview" 
                    className="max-w-full h-auto object-contain"
                    style={{ width: '100%', maxHeight: 'none' }}
                  />
                </div>
                <div className="p-2 bg-gray-50 text-center text-sm text-gray-500">
                  <p>Scroll to see the full image. {isMobile ? 'Tap the button below to save or share.' : 'The downloaded image will include all content.'}</p>
                </div>
              </div>
            ) : isLoading ? (
              <div className="my-6 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
                <span className="ml-3 text-gray-700">Generating image{isMobile ? ' (this may take longer on mobile)' : ''}...</span>
              </div>
            ) : (
              <div className="my-6 flex items-center justify-center flex-col">
                <div className="mb-3 text-gray-700 text-center">
                  <p className="text-lg font-medium">Click below to generate your shareable setlist image</p>
                  <p className="text-sm text-gray-500 mt-1">This may take a few moments{isMobile ? ' on mobile' : ''}</p>
                </div>
                <button 
                  onClick={generateImage}
                  className={!usesCustomColors ? 
                    `px-4 py-2 bg-gradient-to-r ${getGradientStyle()} text-white rounded hover:opacity-90` :
                    'px-4 py-2 text-white rounded hover:opacity-90'
                  }
                  style={usesCustomColors ? { background: getPrimaryGradient() } : undefined}
                >
                  Generate Shareable Image
                </button>
              </div>
            )}
          </div>
        </div>
        
        <div className="p-4 border-t flex flex-wrap gap-3 justify-center">
          {/* Main action button - optimized for mobile or desktop */}
          <button
            onClick={downloadImage}
            disabled={!imageUrl || isLoading}
            className={`px-4 py-2 rounded-lg ${
              imageUrl && !isLoading 
                ? !usesCustomColors ? `bg-gradient-to-r ${getGradientStyle()} text-white` : 'text-white'
                : 'bg-gray-300 text-gray-500'
            } flex items-center gap-2 transition-all duration-200`}
            style={imageUrl && !isLoading && usesCustomColors ? { background: getPrimaryGradient() } : undefined}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            {isMobile ? 'Save Image' : 'Download for Instagram'}
          </button>
          
          {/* Copy to clipboard button - shown conditionally */}
          {clipboardSupported && (
            <button
              onClick={copyImageToClipboard}
              disabled={!imageUrl || isLoading}
              className={`px-4 py-2 rounded-lg ${
                imageUrl && !isLoading 
                  ? `bg-white border border-${getSecondaryColorClass()} text-${getSecondaryColorClass()}` 
                  : 'bg-gray-200 text-gray-500 border border-gray-300'
              } flex items-center gap-2 transition-all duration-200`}
              style={imageUrl && !isLoading && usesCustomColors ? 
                { borderColor: getSecondaryColor(), color: getSecondaryColor() } : undefined}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              {copySuccess ? 'Copied!' : isMobile ? 'Copy Link' : 'Copy to Clipboard'}
            </button>
          )}
          
          {/* Native share button - mobile only */}
          {isMobile && imageUrl && typeof navigator !== 'undefined' && 'share' in navigator && (
            <button
              onClick={handleNativeShare}
              disabled={!imageUrl || isLoading}
              className={`px-4 py-2 rounded-lg bg-white border border-green-600 text-green-600 flex items-center gap-2`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              Share
            </button>
          )}
        </div>
        
        <div className="px-4 pb-4 text-center">
          <p className="text-sm text-gray-500">
            {isMobile ? 
              'Share your dream setlist on Instagram and tag the artist!' :
              `Share your dream setlist on Instagram and tag ${artistName}!`
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShareModal; 