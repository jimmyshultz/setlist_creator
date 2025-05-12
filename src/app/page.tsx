'use client';

import React, { useState, useEffect } from 'react';
import {
  DndContext,
  DragEndEvent, 
  DragStartEvent,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  closestCenter,
} from '@dnd-kit/core';
import { 
  SortableContext, 
  arrayMove, 
  sortableKeyboardCoordinates 
} from '@dnd-kit/sortable';
import { useSearchParams } from 'next/navigation';

import Header from '@/components/Header';
import SongBank from '@/components/SongBank';
import Setlist from '@/components/Setlist';
import ShareModal from '@/components/ShareModal';
import { SongType } from '@/components/Song';
import { 
  getDefaultArtistAndShow, 
  getArtistById, 
  getShowById, 
  getDefaultColorTheme,
  ColorTheme
} from '@/utils/artistDataHelper';

// Default maximum number of songs allowed if not specified in the data
const DEFAULT_MAX_SETLIST_SONGS = 7;

export default function Home() {
  // Get URL parameters
  const searchParams = useSearchParams();
  
  // State for the currently selected artist and show
  const [artistName, setArtistName] = useState<string>('');
  const [showDate, setShowDate] = useState<string>('');
  const [showVenue, setShowVenue] = useState<string>('');
  const [tourName, setTourName] = useState<string>('');
  const [maxSongs, setMaxSongs] = useState<number>(DEFAULT_MAX_SETLIST_SONGS);
  const [colorTheme, setColorTheme] = useState<ColorTheme>(getDefaultColorTheme());
  
  // State for songs and setlist
  const [items, setItems] = useState<SongType[]>([]);
  const [setlistIds, setSetlistIds] = useState<string[]>([]);
  
  // Share modal state
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // Initialize data on component mount
  useEffect(() => {
    // Get artist and show IDs from URL parameters
    const artistId = searchParams.get('artist');
    const showId = searchParams.get('show');
    
    let artistData;
    let showData;
    let songsData;
    
    // If both artist and show are specified in URL
    if (artistId && showId) {
      artistData = getArtistById(artistId);
      if (artistData) {
        showData = getShowById(artistId, showId);
      }
    }
    
    // If we couldn't find the specified artist/show, use default
    if (!artistData || !showData) {
      const defaultData = getDefaultArtistAndShow();
      if (defaultData) {
        artistData = defaultData.artist;
        showData = defaultData.show;
        songsData = defaultData.songs;
      }
    } else {
      // Use the songs from the specified show
      songsData = showData.songs;
    }
    
    // Set the data if we have it
    if (artistData && showData && songsData) {
      setArtistName(artistData.name);
      setShowDate(showData.date);
      setShowVenue(showData.venue);
      setTourName(showData.tourName || '');
      setMaxSongs(showData.maxSongs || DEFAULT_MAX_SETLIST_SONGS);
      
      // Set the artist's color theme, or use default if not specified
      if (artistData.colorTheme) {
        setColorTheme(artistData.colorTheme);
      } else {
        setColorTheme(getDefaultColorTheme());
      }
      
      setItems(songsData);
    }
  }, [searchParams]);

  // Available items are all items that aren't in the setlist
  const bankItems = items.filter(item => !setlistIds.includes(item.id));
  
  // Check if setlist is at max capacity
  const isSetlistFull = setlistIds.length >= maxSongs;
  
  // Check if setlist is complete - has exactly the maximum number of songs
  const isSetlistComplete = setlistIds.length === maxSongs;

  // Configure sensors for drag detection
  const sensors = useSensors(
    useSensor(PointerSensor, {
      // Very basic configuration - minimal distance
      activationConstraint: {
        distance: 1,
      }
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    // Add dragging class to body for visual feedback
    document.body.classList.add('is-dragging');
  };

  const handleDragEnd = (event: DragEndEvent) => {
    document.body.classList.remove('is-dragging');
    
    const { active, over } = event;
    
    if (!over) return;
    
    const activeId = active.id.toString();
    const overId = over.id.toString();
    
    // Handle dropping on containers
    if (overId === 'setlist-container') {
      // Only add if not already in setlist and if setlist isn't full
      if (!setlistIds.includes(activeId) && setlistIds.length < maxSongs) {
        setSetlistIds(prev => [...prev, activeId]);
      }
      return;
    }
    
    if (overId === 'bank-container') {
      // Remove from setlist if it's there
      setSetlistIds(prev => prev.filter(id => id !== activeId));
      return;
    }
    
    // Handle reordering within setlist
    if (setlistIds.includes(activeId) && setlistIds.includes(overId)) {
      const oldIndex = setlistIds.indexOf(activeId);
      const newIndex = setlistIds.indexOf(overId);
      
      if (oldIndex !== newIndex) {
        setSetlistIds(items => arrayMove(items, oldIndex, newIndex));
      }
    }
    
    // Handle moving from bank to setlist by dropping on a setlist item
    if (!setlistIds.includes(activeId) && setlistIds.includes(overId)) {
      // Insert at position of target item, but only if setlist isn't full
      if (setlistIds.length < maxSongs) {
        const newIndex = setlistIds.indexOf(overId);
        const newSetlist = [...setlistIds];
        newSetlist.splice(newIndex, 0, activeId);
        setSetlistIds(newSetlist);
      }
    }
    
    // Handle moving from setlist to bank (dropping on bank item)
    if (setlistIds.includes(activeId) && !setlistIds.includes(overId)) {
      // Remove from setlist
      setSetlistIds(prev => prev.filter(id => id !== activeId));
    }
  };
  
  // Get the full song objects for the current setlist
  const setlistSongs = setlistIds.map(id => 
    items.find(song => song.id === id)
  ).filter(Boolean) as SongType[];
  
  // Open the share modal
  const handleShare = () => {
    setIsShareModalOpen(true);
  };

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

  // Get the gradient classes for styling
  const getGradientClasses = () => {
    // Check if the primary class is valid
    if (!colorTheme?.primary) {
      return 'from-indigo-600 to-purple-600'; // Default gradient
    }
    return colorTheme.primary;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header 
        artistName={artistName} 
        concertDate={showDate} 
        concertVenue={showVenue} 
        tourName={tourName}
        colorTheme={colorTheme}
      />
      
      <main className="flex-1 p-4 md:p-6">
        <div className="container mx-auto max-w-6xl">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6" style={{ minHeight: "calc(100vh - 200px)" }}>
              <div className="bg-white rounded-lg shadow-md overflow-hidden h-full">
                <SongBank 
                  songs={items} 
                  bankItems={bankItems} 
                  isSetlistFull={isSetlistFull}
                />
              </div>
              
              <div className="overflow-hidden rounded-lg shadow-md h-full">
                <Setlist 
                  setlistIds={setlistIds} 
                  allSongs={items}
                  maxSongs={maxSongs}
                />
              </div>
            </div>
          </DndContext>
          
          <div className="mt-8 text-center">
            <p className="text-gray-500 text-sm">
              Drag songs from the bank to create your perfect {maxSongs}-song setlist
            </p>
            
            {isSetlistComplete && (
              <div className="mt-6">
                <button
                  onClick={handleShare}
                  className={!usesCustomColors ? 
                    `px-4 py-3 bg-gradient-to-r ${getGradientClasses()} text-white rounded-lg hover:opacity-90 shadow-md flex items-center justify-center gap-2 mx-auto` : 
                    `px-4 py-3 text-white rounded-lg hover:opacity-90 shadow-md flex items-center justify-center gap-2 mx-auto`
                  }
                  style={usesCustomColors ? { background: getPrimaryGradient() } : undefined}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4 4m4-4v12" />
                  </svg>
                  Share on Instagram
                </button>
                <p className="mt-3 text-sm text-gray-500">
                  Your setlist is complete! Share it with friends and {artistName}!
                </p>
              </div>
            )}
            
            {!isSetlistComplete && (
              <p className="mt-1 text-gray-500 text-sm">
                Share your setlist with friends and {artistName} when it's complete!
              </p>
            )}
          </div>
        </div>
      </main>
      
      {/* Share Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        artistName={artistName}
        showDate={showDate}
        showVenue={showVenue}
        tourName={tourName}
        setlistSongs={setlistSongs}
        colorTheme={colorTheme}
      />
    </div>
  );
}
