import { MusicVideo } from './models.js';
export declare const parseGetSuggestionsBody: (body: {
    contents: {
        singleColumnMusicWatchNextResultsRenderer: {
            tabbedRenderer: {
                watchNextTabbedResultsRenderer: {
                    tabs: {
                        tabRenderer: {
                            content: {
                                musicQueueRenderer: {
                                    content: {
                                        playlistPanelRenderer: {
                                            contents: [];
                                        };
                                    };
                                };
                            };
                        };
                    }[];
                };
            };
        };
    };
}) => MusicVideo[];
export declare function GetMusicVideoBasedSuggestions(videoId: string, proxy: {
    Host: string;
    Port: number;
    UserPass?: string;
} | undefined): Promise<MusicVideo[]>;
//# sourceMappingURL=suggestions.d.ts.map