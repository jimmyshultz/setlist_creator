import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export interface SongType {
  id: string;
  title: string;
  artist: string;
  duration: string;
}

interface SongProps {
  song: SongType;
  index?: number;
  isInSetlist?: boolean;
  disabled?: boolean;
}

export default function Song({ song, index, isInSetlist = false, disabled = false }: SongProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ 
    id: song.id,
    transition: {
      duration: 150, // ms
      easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
    },
    disabled,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? '0.8' : disabled ? '0.6' : '1',
    zIndex: isDragging ? '999' : 'auto',
    position: 'relative' as const,
  };

  // Drag indicator icon (hamburger menu/grip dots)
  const DragIndicator = () => (
    <div className="flex flex-col justify-center items-center mr-2 text-gray-400">
      <div className="flex space-x-0.5 mb-0.5">
        <div className="w-1 h-1 rounded-full bg-current"></div>
        <div className="w-1 h-1 rounded-full bg-current"></div>
      </div>
      <div className="flex space-x-0.5 mb-0.5">
        <div className="w-1 h-1 rounded-full bg-current"></div>
        <div className="w-1 h-1 rounded-full bg-current"></div>
      </div>
      <div className="flex space-x-0.5">
        <div className="w-1 h-1 rounded-full bg-current"></div>
        <div className="w-1 h-1 rounded-full bg-current"></div>
      </div>
    </div>
  );

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`${isInSetlist ? 'setlist-item' : 'song-item'} ${
        isDragging ? 'shadow-lg' : ''
      } ${disabled ? 'cursor-not-allowed bg-gray-50' : ''} relative group`}
      data-position={index !== undefined ? `${index + 1}.` : ''}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <DragIndicator />
          <div>
            <h3 className={`font-medium ${disabled ? 'text-gray-500' : ''}`}>{song.title}</h3>
            <p className="text-sm text-gray-500">{song.artist}</p>
          </div>
        </div>
      </div>
      
      {!disabled && (
        <div className="opacity-0 md:group-hover:opacity-100 absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-gray-400 bg-white px-1 rounded transition-opacity">
          Drag me
        </div>
      )}
    </div>
  );
} 