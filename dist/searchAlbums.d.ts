import { AlbumPreview } from './models.js';
export declare const parseSearchAlbumsBody: (body: any) => AlbumPreview[];
export declare function SearchForAlbum(query: string, proxy: {
    Host: string;
    Port: number;
    UserPass?: string;
} | undefined): Promise<AlbumPreview[]>;
//# sourceMappingURL=searchAlbums.d.ts.map