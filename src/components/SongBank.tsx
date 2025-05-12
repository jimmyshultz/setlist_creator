import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import Song, { SongType } from './Song';

interface SongBankProps {
  songs: SongType[];
  bankItems: SongType[]; // Available songs that aren't in the setlist
  isSetlistFull?: boolean;
}

export default function SongBank({ songs, bankItems, isSetlistFull = false }: SongBankProps) {
  const { setNodeRef, isOver } = useDroppable({ 
    id: 'bank-container',
  });

  return (
    <div className="h-full flex flex-col">
      <div className="bg-gray-50 p-4 rounded-t-lg border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800">Song Bank</h2>
        <p className="text-sm text-gray-500">
          {isSetlistFull 
            ? "Your setlist is full! Return songs here if needed" 
            : "Drag songs to your setlist"}
        </p>
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
              {isSetlistFull && (
                <div className="mb-4 p-3 bg-yellow-50 rounded-md text-yellow-700 text-sm">
                  <p>Your setlist is full with 7 songs.</p>
                  <p>You can drag songs back here if you want to swap them.</p>
                </div>
              )}
              {bankItems.map(song => (
                <Song 
                  key={song.id} 
                  song={song} 
                  disabled={isSetlistFull}
                />
              ))}
            </div>
          </SortableContext>
        )}
      </div>
    </div>
  );
} 