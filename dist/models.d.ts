export interface SearchSuggestion {
    query: string;
    runs: {
        text: string;
        bold?: boolean;
    }[];
}
export interface SuggestedTrack {
    videoId: string;
    title: string;
    artists: string[];
    duration: string;
    thumbnails: {
        url: string;
        width: number;
        height: number;
    }[];
    params: string;
    playerParams: string;
    album?: string;
    views?: string;
}
export interface SuggestedAlbum {
    browseId: string;
    title: string;
    thumbnails: {
        url: string;
        width: number;
        height: number;
    }[];
    year?: string;
}
export declare enum AccountType {
    REGULAR = "regular",
    VERIFIED_ARTIST = "BADGE_STYLE_TYPE_VERIFIED_ARTIST"
}
export declare enum AlbumType {
    ep = "EP",
    album = "Album",
    single = "Single"
}
export declare enum PageType {
    artist = "MUSIC_PAGE_TYPE_ARTIST",
    album = "MUSIC_PAGE_TYPE_ALBUM",
    playlist = "MUSIC_PAGE_TYPE_PLAYLIST"
}
export interface MusicVideo {
    youtubeId?: string;
    title?: string;
    thumbnailUrl?: string;
    artists?: {
        name: string;
        id?: string;
    }[];
    album?: string;
    isExplicit?: boolean;
    duration?: {
        label: string;
        totalSeconds: number;
    };
}
export interface AlbumPreview {
    albumId?: string;
    title?: string;
    type?: AlbumType;
    thumbnailUrl?: string;
    artist?: string;
    artistId?: string;
    year?: string;
    isExplicit?: boolean;
}
export interface ArtistPreview {
    name?: string;
    artistId?: string;
    thumbnailUrl?: string;
    subscribers?: string;
}
export interface Artist {
    artistId?: string;
    name?: string;
    description?: string;
    thumbnails?: any[];
    songsPlaylistId?: string;
    albums?: AlbumPreview[];
    singles?: AlbumPreview[];
    suggestedArtists?: ArtistPreview[];
    subscribers?: string;
}
export interface PlaylistPreview {
    playlistId?: string;
    title?: string;
    thumbnailUrl?: string;
    totalSongs?: number;
}
//# sourceMappingURL=models.d.ts.map