import { MusicVideo } from './models.js';
export declare const parseListMusicsFromAlbumBody: (body: any) => MusicVideo[];
export declare function ListMusicVideosFromAlbum(albumId: string, proxy: {
    Host: string;
    Port: number;
    UserPass?: string;
} | undefined): Promise<MusicVideo[]>;
//# sourceMappingURL=listMusicsFromAlbum.d.ts.map