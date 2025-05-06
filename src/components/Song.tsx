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
}

export default function Song({ song, index, isInSetlist = false }: SongProps) {
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
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? '0.8' : '1',
    zIndex: isDragging ? '999' : 'auto',
    position: 'relative' as const,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`${isInSetlist ? 'setlist-item' : 'song-item'} ${isDragging ? 'shadow-lg' : ''}`}
      data-position={index !== undefined ? `${index + 1}.` : ''}
    >
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-medium">{song.title}</h3>
          <p className="text-sm text-gray-500">{song.artist}</p>
        </div>
        <span className="text-xs text-gray-400">{song.duration}</span>
      </div>
    </div>
  );
} 