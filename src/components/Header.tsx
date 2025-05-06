import React from 'react';

interface HeaderProps {
  artistName: string;
  concertDate?: string;
  concertVenue?: string;
}

export default function Header({ artistName, concertDate, concertVenue }: HeaderProps) {
  return (
    <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 md:p-6">
      <div className="container mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold">{artistName} Setlist Creator</h1>
        
        {(concertDate || concertVenue) && (
          <div className="mt-2 flex flex-col sm:flex-row sm:items-center sm:gap-2">
            {concertDate && (
              <div className="flex items-center text-white/80">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-sm">{concertDate}</span>
              </div>
            )}
            
            {concertVenue && (
              <div className="flex items-center text-white/80">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-sm">{concertVenue}</span>
              </div>
            )}
          </div>
        )}
        
        <p className="mt-2 text-white/70 text-sm">
          Help create the perfect setlist by dragging songs from the bank to your setlist
        </p>
      </div>
    </header>
  );
} 