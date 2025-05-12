import React from 'react';
import { ColorTheme } from '@/utils/artistDataHelper';

interface HeaderProps {
  artistName: string;
  concertDate: string;
  concertVenue: string;
  tourName?: string;
  colorTheme: ColorTheme;
}

const Header: React.FC<HeaderProps> = ({ 
  artistName, 
  concertDate, 
  concertVenue,
  tourName,
  colorTheme
}) => {
  // Check if date contains a range (indicated by presence of a hyphen)
  const isDateRange = concertDate.includes('-');
  
  // Determine what to display as the subtitle
  const displayLocation = isDateRange ? tourName : concertVenue;
  
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
  
  // Function to get the gradient classes for non-custom colors
  const getGradientClasses = () => {
    // Check if the primary class is valid
    if (!colorTheme?.primary) {
      return 'from-indigo-600 to-purple-600'; // Default gradient
    }
    return colorTheme.primary;
  };

  return (
    <header 
      className={!usesCustomColors ? `bg-gradient-to-r ${getGradientClasses()} text-white py-8 shadow-md` : 'text-white py-8 shadow-md'}
      style={usesCustomColors ? { background: getPrimaryGradient() } : undefined}
    >
      <div className="container mx-auto px-4 flex flex-col items-center text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Make {artistName}&apos;s Setlist
        </h1>
        
        <div className="flex flex-col items-center space-y-2">
          <p className="text-lg font-medium">
            {concertDate}
          </p>
          
          {displayLocation && (
            <p className="text-md opacity-90">
              {displayLocation}
            </p>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header; 