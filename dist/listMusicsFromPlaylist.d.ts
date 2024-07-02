import { MusicVideo } from './models.js';
export declare const parseListMusicsFromPlaylistBody: (body: {
    contents: {
        singleColumnBrowseResultsRenderer: {
            tabs: {
                tabRenderer: {
                    content: {
                        sectionListRenderer: {
                            contents: {
                                musicPlaylistShelfRenderer?: {
                                    contents: [];
                                };
                                musicCarouselShelfRenderer: {
                                    contents: [];
                                };
                            }[];
                        };
                    };
                };
            }[];
        };
    };
}) => MusicVideo[];
export declare function ListMusicVideosFromPlaylist(playlistId: string, proxy: {
    Host: string;
    Port: number;
    UserPass?: string;
} | undefined): Promise<MusicVideo[]>;
//# sourceMappingURL=listMusicsFromPlaylist.d.ts.map