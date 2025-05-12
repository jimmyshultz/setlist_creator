import artistsData from '../data/artists.json';
import { SongType } from '../components/Song';

export interface ArtistData {
  id: string;
  name: string;
  shows: ShowData[];
}

export interface ShowData {
  id: string;
  date: string;
  venue: string;
  songs: SongType[];
}

/**
 * Get all available artists
 */
export function getArtists(): ArtistData[] {
  return artistsData.artists;
}

/**
 * Get artist data by ID
 */
export function getArtistById(artistId: string): ArtistData | undefined {
  return artistsData.artists.find(artist => artist.id === artistId);
}

/**
 * Get all shows for a specific artist
 */
export function getShowsByArtistId(artistId: string): ShowData[] {
  const artist = getArtistById(artistId);
  return artist ? artist.shows : [];
}

/**
 * Get a specific show by artist ID and show ID
 */
export function getShowById(artistId: string, showId: string): ShowData | undefined {
  const shows = getShowsByArtistId(artistId);
  return shows.find(show => show.id === showId);
}

/**
 * Get songs for a specific show
 */
export function getSongsForShow(artistId: string, showId: string): SongType[] {
  const show = getShowById(artistId, showId);
  return show ? show.songs : [];
}

/**
 * Get default artist and show (first in the list)
 */
export function getDefaultArtistAndShow(): { 
  artist: ArtistData; 
  show: ShowData;
  songs: SongType[];
} | null {
  const artists = getArtists();
  if (artists.length === 0) return null;
  
  const defaultArtist = artists[0];
  if (defaultArtist.shows.length === 0) return null;
  
  const defaultShow = defaultArtist.shows[0];
  
  return {
    artist: defaultArtist,
    show: defaultShow,
    songs: defaultShow.songs
  };
} 