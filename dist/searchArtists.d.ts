import { ArtistPreview } from './models.js';
export declare const parseArtistsSearchBody: (body: any) => ArtistPreview[];
export declare function SearchForArtists(query: string, proxy: {
    Host: string;
    Port: number;
    UserPass?: string;
} | undefined, options?: {
    lang?: string;
    country?: string;
}): Promise<ArtistPreview[]>;
//# sourceMappingURL=searchArtists.d.ts.map