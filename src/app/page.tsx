'use client';

import React, { useState } from 'react';
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

import Header from '@/components/Header';
import SongBank from '@/components/SongBank';
import Setlist from '@/components/Setlist';
import { SongType } from '@/components/Song';

// Sample data for demonstration
const ARTIST_NAME = 'Taylor Swift';
const CONCERT_DATE = 'June 15, 2025';
const CONCERT_VENUE = 'Madison Square Garden, NYC';

const SAMPLE_SONGS: SongType[] = [
  { id: '1', title: 'Cruel Summer', artist: ARTIST_NAME, duration: '2:58' },
  { id: '2', title: 'Love Story', artist: ARTIST_NAME, duration: '3:55' },
  { id: '3', title: 'Blank Space', artist: ARTIST_NAME, duration: '3:51' },
  { id: '4', title: 'Shake It Off', artist: ARTIST_NAME, duration: '3:39' },
  { id: '5', title: 'Anti-Hero', artist: ARTIST_NAME, duration: '3:20' },
  { id: '6', title: 'You Belong With Me', artist: ARTIST_NAME, duration: '3:52' },
  { id: '7', title: 'Cardigan', artist: ARTIST_NAME, duration: '3:59' },
  { id: '8', title: 'All Too Well', artist: ARTIST_NAME, duration: '5:29' },
  { id: '9', title: 'The Man', artist: ARTIST_NAME, duration: '3:10' },
  { id: '10', title: 'Bad Blood', artist: ARTIST_NAME, duration: '3:31' },
  { id: '11', title: 'Wildest Dreams', artist: ARTIST_NAME, duration: '3:40' },
  { id: '12', title: 'Delicate', artist: ARTIST_NAME, duration: '3:52' },
  { id: '13', title: 'Enchanted', artist: ARTIST_NAME, duration: '5:53' },
  { id: '14', title: 'Style', artist: ARTIST_NAME, duration: '3:51' },
  { id: '15', title: 'Lover', artist: ARTIST_NAME, duration: '3:41' },
];

export default function Home() {
  const [items, setItems] = useState(SAMPLE_SONGS);
  const [setlistIds, setSetlistIds] = useState<string[]>([]);

  // Available items are all items that aren't in the setlist
  const bankItems = items.filter(item => !setlistIds.includes(item.id));

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
      // Only add if not already in setlist
      if (!setlistIds.includes(activeId)) {
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
      // Insert at position of target item
      const newIndex = setlistIds.indexOf(overId);
      const newSetlist = [...setlistIds];
      newSetlist.splice(newIndex, 0, activeId);
      setSetlistIds(newSetlist);
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
        artistName={ARTIST_NAME} 
        concertDate={CONCERT_DATE} 
        concertVenue={CONCERT_VENUE} 
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
                <SongBank songs={items} bankItems={bankItems} />
              </div>
              
              <div className="overflow-hidden rounded-lg shadow-md h-full">
                <Setlist 
                  setlistIds={setlistIds} 
                  allSongs={items} 
                />
              </div>
            </div>
          </DndContext>
          
          <div className="mt-8 text-center text-gray-500 text-sm">
            <p>Drag songs from the bank to create your perfect setlist</p>
            <p className="mt-1">Share your setlist with friends and the artist!</p>
          </div>
        </div>
      </main>
    </div>
  );
}
