import artistsData from '@/data/artists.json';
import { SongType } from '@/components/Song';

export interface ShowData {
  id: string;
  date: string;
  venue: string;
  tourName?: string;
  maxSongs?: number;
  songs: SongType[];
}

export interface ColorTheme {
  primary: string;
  secondary: string;
  accent: string;
}

export interface ArtistData {
  id: string;
  name: string;
  colorTheme?: ColorTheme;
  shows: ShowData[];
}

interface ArtistShowData {
  artist: ArtistData;
  show: ShowData;
  songs: SongType[];
}

/**
 * Get a list of all artists
 */
export function getArtists(): ArtistData[] {
  return artistsData.artists;
}

/**
 * Get an artist by their ID
 */
export function getArtistById(id: string): ArtistData | undefined {
  return artistsData.artists.find(artist => artist.id === id);
}

/**
 * Get all shows for a given artist
 */
export function getShowsByArtistId(artistId: string): ShowData[] {
  const artist = getArtistById(artistId);
  return artist ? artist.shows : [];
}

/**
 * Get a specific show by artist ID and show ID
 */
export function getShowById(artistId: string, showId: string): ShowData | undefined {
  const artist = getArtistById(artistId);
  return artist?.shows.find(show => show.id === showId);
}

/**
 * Get the default artist (first in the list) and default show (first in that artist's shows)
 */
export function getDefaultArtistAndShow(): ArtistShowData | undefined {
  if (artistsData.artists.length === 0) {
    return undefined;
  }
  
  const defaultArtist = artistsData.artists[0];
  
  if (defaultArtist.shows.length === 0) {
    return undefined;
  }
  
  const defaultShow = defaultArtist.shows[0];
  
  return {
    artist: defaultArtist,
    show: defaultShow,
    songs: defaultShow.songs
  };
}

/**
 * Get the default color theme
 */
export function getDefaultColorTheme(): ColorTheme {
  return {
    primary: "from-indigo-600 to-purple-600",
    secondary: "indigo-600",
    accent: "purple-500"
  };
}

/**
 * Get songs for a specific show
 */
export function getSongsForShow(artistId: string, showId: string): SongType[] {
  const show = getShowById(artistId, showId);
  return show ? show.songs : [];
} 