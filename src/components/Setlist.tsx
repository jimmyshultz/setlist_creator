import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import Song, { SongType } from './Song';

interface SetlistProps {
  setlistIds: string[];
  allSongs: SongType[];
  maxSongs: number;
}

export default function Setlist({ setlistIds, allSongs, maxSongs }: SetlistProps) {
  const { setNodeRef, isOver } = useDroppable({ 
    id: 'setlist-container',
    disabled: setlistIds.length >= maxSongs, // Disable dropping if at max capacity
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

  // Calculate remaining slots
  const remainingSlots = maxSongs - setlistSongs.length;
  const isFull = remainingSlots === 0;

  return (
    <div className="h-full flex flex-col">
      <div className="bg-gray-50 p-4 rounded-t-lg border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800">Your Setlist</h2>
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500">
            {isFull ? (
              <span className="text-green-600 font-medium">Setlist complete!</span>
            ) : (
              `Add ${remainingSlots} more song${remainingSlots !== 1 ? 's' : ''}`
            )}
          </p>
          <p className="text-sm font-medium">
            {setlistSongs.length}/{maxSongs} songs · {formatDuration(totalDuration)}
          </p>
        </div>
      </div>
      
      <div className="flex-1 overflow-hidden">
        <div 
          ref={setNodeRef}
          className={`paper p-4 h-full overflow-y-auto transition-colors duration-200 ${
            isOver && !isFull ? 'bg-indigo-50' : ''
          } ${isFull ? 'bg-green-50/30' : ''}`}
          style={{ scrollBehavior: 'smooth' }}
        >
          {setlistSongs.length === 0 ? (
            <div className="flex items-center justify-center h-full text-center p-6 text-gray-400 relative z-10">
              <div>
                <p>Build your {maxSongs}-song setlist</p>
                <p className="mt-2 text-sm">Drag songs here from the Song Bank</p>
              </div>
            </div>
          ) : (
            <>
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
              
              {!isFull && (
                <div className="mt-4 pt-2 border-t border-dashed border-gray-200 text-center text-gray-400 text-sm">
                  <p>Add {remainingSlots} more song{remainingSlots !== 1 ? 's' : ''} to complete your setlist</p>
                </div>
              )}
              
              {isFull && (
                <div className="mt-4 p-3 bg-green-50 rounded-md text-center text-green-700 text-sm">
                  <p className="font-medium">Your setlist is complete!</p>
                  <p className="mt-1">Rearrange songs by dragging if needed</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
} 