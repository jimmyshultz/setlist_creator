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
  isMobile?: boolean;
  onAdd?: (id: string) => void;
  onRemove?: (id: string) => void;
}

export default function Song({ 
  song, 
  index, 
  isInSetlist = false, 
  disabled = false, 
  isMobile = false,
  onAdd,
  onRemove
}: SongProps) {
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
    <div 
      className={`flex flex-col justify-center items-center mr-2 ${isMobile ? 'p-3' : 'mr-2'} text-gray-400`}
      {...(isMobile ? listeners : {})}
      style={isMobile ? { touchAction: 'none' } : undefined}
    >
      <div className="flex space-x-0.5 mb-0.5">
        <div className={`w-1 h-1 ${isMobile ? 'w-1.5 h-1.5' : ''} rounded-full bg-current`}></div>
        <div className={`w-1 h-1 ${isMobile ? 'w-1.5 h-1.5' : ''} rounded-full bg-current`}></div>
      </div>
      <div className="flex space-x-0.5 mb-0.5">
        <div className={`w-1 h-1 ${isMobile ? 'w-1.5 h-1.5' : ''} rounded-full bg-current`}></div>
        <div className={`w-1 h-1 ${isMobile ? 'w-1.5 h-1.5' : ''} rounded-full bg-current`}></div>
      </div>
      <div className="flex space-x-0.5">
        <div className={`w-1 h-1 ${isMobile ? 'w-1.5 h-1.5' : ''} rounded-full bg-current`}></div>
        <div className={`w-1 h-1 ${isMobile ? 'w-1.5 h-1.5' : ''} rounded-full bg-current`}></div>
      </div>
    </div>
  );

  // Action button - shown on mobile as a fallback to dragging
  const ActionButton = () => {
    if (!isMobile) return null;
    
    if (isInSetlist) {
      return (
        <button
          onClick={() => onRemove?.(song.id)}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-red-100 text-red-700 hover:bg-red-200 rounded-full p-1.5"
          aria-label="Remove from setlist"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      );
    }
    
    // For song bank items, only show add button if setlist isn't full
    if (!disabled) {
      return (
        <button
          onClick={() => onAdd?.(song.id)}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-green-100 text-green-700 hover:bg-green-200 rounded-full p-1.5"
          aria-label="Add to setlist"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
        </button>
      );
    }
    
    return null;
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...(isMobile ? {} : listeners)}
      {...attributes}
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
      
      {!disabled && !isMobile && (
        <div className="opacity-0 md:group-hover:opacity-100 absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-gray-400 bg-white px-1 rounded transition-opacity">
          Drag me
        </div>
      )}
      
      <ActionButton />
    </div>
  );
} 