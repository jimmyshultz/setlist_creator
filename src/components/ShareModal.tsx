import React, { useState, useRef, useEffect } from 'react';
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
  const shareableRef = useRef<HTMLDivElement>(null);
  
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
    setClipboardSupported(
      typeof navigator !== 'undefined' && 
      navigator.clipboard !== undefined &&
      typeof navigator.clipboard.write === 'function'
    );
  }, []);

  // Generate image when modal opens
  useEffect(() => {
    if (isOpen && shareableRef.current && !imageUrl) {
      generateImage();
    }
  }, [isOpen, imageUrl]);

  // Reset states when modal closes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setImageUrl(null);
        setCopySuccess(false);
      }, 300);
    }
  }, [isOpen]);

  const generateImage = async () => {
    if (!shareableRef.current) return;
    
    setIsLoading(true);
    
    try {
      // First, ensure the element is fully rendered and images are loaded
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const canvas = await html2canvas(shareableRef.current, {
        scale: 2, // Higher quality
        backgroundColor: 'white',
        logging: false,
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
            
            // Try to trigger any image error handlers early
            // so the color background can render if needed
            const images = el.querySelectorAll('img');
            images.forEach(img => {
              // Force any images to load
              img.crossOrigin = "anonymous";
              
              // Clone the image element's error handler
              const originalOnError = img.onerror;
              
              // Create a combo error handler
              img.onerror = (event) => {
                // Call original error handler if it exists
                if (typeof originalOnError === 'function') {
                  originalOnError.call(img, event);
                }
                
                // Force the image to be hidden
                img.style.display = 'none';
              };
              
              // Re-assign src to force reload
              const src = img.src;
              img.src = '';
              img.src = src;
            });
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
  };

  const downloadImage = () => {
    if (!imageUrl) return;
    
    const artistSlug = artistName.toLowerCase().replace(/\s+/g, '-');
    const filename = `${artistSlug}-setlist.png`;
    
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const copyImageToClipboard = async () => {
    if (!imageUrl || !clipboardSupported) return;
    
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob
        })
      ]);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (error) {
      console.error('Error copying to clipboard:', error);
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
                  <p>Scroll to see the full image. The downloaded image will include all content.</p>
                </div>
              </div>
            ) : isLoading ? (
              <div className="my-6 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
                <span className="ml-3 text-gray-700">Generating image...</span>
              </div>
            ) : (
              <div className="my-6 flex items-center justify-center flex-col">
                <div className="mb-3 text-gray-700 text-center">
                  <p className="text-lg font-medium">Click below to generate your shareable setlist image</p>
                  <p className="text-sm text-gray-500 mt-1">This may take a few moments</p>
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
            Download for Instagram
          </button>
          
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
              {copySuccess ? 'Copied!' : 'Copy to Clipboard'}
            </button>
          )}
        </div>
        
        <div className="px-4 pb-4 text-center">
          <p className="text-sm text-gray-500">
            Share your dream setlist on Instagram and tag {artistName}!
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShareModal; 