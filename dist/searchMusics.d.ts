import { MusicVideo } from './models.js';
export declare const parseSearchMusicsBody: (body: {
    contents: any;
}) => MusicVideo[];
export declare function SearchForMusicVideos(query: string, proxy: {
    Host: string;
    Port: number;
    UserPass?: string;
} | undefined): Promise<MusicVideo[]>;
//# sourceMappingURL=searchMusics.d.ts.map