import { PlaylistPreview } from './models.js';
export declare const parseSearchPlaylistsBody: (body: any, onlyOfficialPlaylists: boolean) => PlaylistPreview[];
export declare function SearchForPlaylists(query: string, options?: {
    onlyOfficialPlaylists?: boolean;
    proxy: {
        Host: string;
        Port: number;
        UserPass?: string;
    } | undefined;
}): Promise<PlaylistPreview[]>;
//# sourceMappingURL=searchPlaylists.d.ts.map