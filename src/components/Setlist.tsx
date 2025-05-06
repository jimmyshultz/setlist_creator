import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import Song, { SongType } from './Song';

interface SetlistProps {
  setlistIds: string[];
  allSongs: SongType[];
}

export default function Setlist({ setlistIds, allSongs }: SetlistProps) {
  const { setNodeRef, isOver } = useDroppable({ 
    id: 'setlist-container',
  });
  
  // Map setlistIds to actual song objects
  const setlistSongs = setlistIds.map(id => 
    allSongs.find(song => song.id === id)
  ).filter(Boolean) as SongType[];

  // Calculate total duration
  const totalDuration = setlistSongs.reduce((total, song) => {
    const [mins, secs] = song.duration.split(':').map(Number);
    return total + mins * 60 + secs;
  }, 0);
  
  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m ${secs}s`;
  };

  return (
    <div className="h-full flex flex-col">
      <div className="bg-gray-50 p-4 rounded-t-lg border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800">Your Setlist</h2>
        <div className="flex justify-between">
          <p className="text-sm text-gray-500">Drag to rearrange songs</p>
          <p className="text-sm font-medium">
            {setlistSongs.length} songs · {formatDuration(totalDuration)}
          </p>
        </div>
      </div>
      
      <div className="flex-1 overflow-hidden">
        <div 
          ref={setNodeRef}
          className={`paper p-4 h-full overflow-y-auto transition-colors duration-200 ${
            isOver ? 'bg-indigo-50' : ''
          }`}
          style={{ scrollBehavior: 'smooth' }}
        >
          {setlistSongs.length === 0 ? (
            <div className="flex items-center justify-center h-full text-center p-6 text-gray-400 relative z-10">
              Drag songs here to create your setlist
            </div>
          ) : (
            <SortableContext 
              items={setlistIds}
              strategy={verticalListSortingStrategy}
            >
              <div className="relative z-10 space-y-2">
                {setlistSongs.map((song, index) => (
                  <Song 
                    key={song.id} 
                    song={song} 
                    index={index}
                    isInSetlist={true}
                  />
                ))}
              </div>
            </SortableContext>
          )}
        </div>
      </div>
    </div>
  );
} 