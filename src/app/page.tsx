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
import { SongType } from '@/components/Song';
import { getDefaultArtistAndShow, getArtistById, getShowById } from '@/utils/artistDataHelper';

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
  
  // State for songs and setlist
  const [items, setItems] = useState<SongType[]>([]);
  const [setlistIds, setSetlistIds] = useState<string[]>([]);

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
      setItems(songsData);
    }
  }, [searchParams]);

  // Available items are all items that aren't in the setlist
  const bankItems = items.filter(item => !setlistIds.includes(item.id));
  
  // Check if setlist is at max capacity
  const isSetlistFull = setlistIds.length >= maxSongs;

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

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header 
        artistName={artistName} 
        concertDate={showDate} 
        concertVenue={showVenue} 
        tourName={tourName}
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
          
          <div className="mt-8 text-center text-gray-500 text-sm">
            <p>Drag songs from the bank to create your perfect {maxSongs}-song setlist</p>
            <p className="mt-1">Share your setlist with friends and {artistName}!</p>
          </div>
        </div>
      </main>
    </div>
  );
}
