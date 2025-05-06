import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import Song, { SongType } from './Song';

interface SongBankProps {
  songs: SongType[];
  bankItems: SongType[]; // Available songs that aren't in the setlist
}

export default function SongBank({ songs, bankItems }: SongBankProps) {
  const { setNodeRef, isOver } = useDroppable({ 
    id: 'bank-container',
  });

  return (
    <div className="h-full flex flex-col">
      <div className="bg-gray-50 p-4 rounded-t-lg border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800">Song Bank</h2>
        <p className="text-sm text-gray-500">Drag songs to your setlist</p>
      </div>
      
      <div 
        ref={setNodeRef} 
        className={`p-4 overflow-y-auto flex-1 bg-white transition-colors duration-200 ${
          isOver ? 'bg-green-50' : ''
        }`}
        style={{ scrollBehavior: 'smooth' }}
      >
        {bankItems.length === 0 ? (
          <div className="flex items-center justify-center h-full text-center p-6 text-gray-400">
            <div>
              <p>All songs have been added to your setlist</p>
              <p className="mt-2 text-sm">Drop songs here to return them to the bank</p>
            </div>
          </div>
        ) : (
          <SortableContext 
            items={bankItems.map(song => song.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-2">
              {bankItems.map(song => (
                <Song key={song.id} song={song} />
              ))}
            </div>
          </SortableContext>
        )}
      </div>
    </div>
  );
} 