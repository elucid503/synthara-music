import got from 'got';
import { HttpsProxyAgent } from 'hpagent';

import { SearchSuggestion, SuggestedTrack, SuggestedAlbum } from "./models.js";

export function ParseSearchSuggestionsResponse(responseData: any): { Suggestions: SearchSuggestion[]; Tracks: SuggestedTrack[]; Albums: SuggestedAlbum[] } {
 
    const Suggestions: SearchSuggestion[] = [];
    const Tracks: SuggestedTrack[] = [];
    const Albums: SuggestedAlbum[] = [];

    const contents = responseData.contents;

        contents.forEach((content: any) => {

            if (content.searchSuggestionsSectionRenderer) {

                const suggestions = content.searchSuggestionsSectionRenderer.contents;
        
                suggestions.forEach((suggestion: any) => {

                    if (suggestion.searchSuggestionRenderer) {
                    
                        const query = suggestion.searchSuggestionRenderer.navigationEndpoint.searchEndpoint.query;
                        const runs = suggestion.searchSuggestionRenderer.suggestion.runs;
        
                        Suggestions.push({ query, runs });
                        
                    }
                    
                    if (suggestion.musicResponsiveListItemRenderer) {
                    
                        const flexColumns = suggestion.musicResponsiveListItemRenderer.flexColumns;
                        const thumbnails = suggestion.musicResponsiveListItemRenderer.thumbnail.musicThumbnailRenderer.thumbnail.thumbnails;
                                
                        const titleRun = flexColumns[0].musicResponsiveListItemFlexColumnRenderer.text.runs[0];
                        const subtitleRuns = flexColumns[1].musicResponsiveListItemFlexColumnRenderer.text.runs;
        
                        if ((subtitleRuns || [])[0]?.text === 'Song') {
                        
                            const title = titleRun.text;
                            const artistNames = subtitleRuns.filter((run: any, index: number) => index % 2 === 0 && index !== 0).map((run: any) => run.text);
                            artistNames.pop(); // Remove the last, which will always be the number of plays
                            
                            const videoId = suggestion.musicResponsiveListItemRenderer.overlay?.musicItemThumbnailOverlayRenderer?.content?.musicPlayButtonRenderer?.playNavigationEndpoint?.watchEndpoint?.videoId || '';
                            const duration = subtitleRuns.find((run: any) => run.text.includes(':'))?.text || '';
                            const views = subtitleRuns.find((run: any) => run.text.includes('plays'))?.text.split(' ')[0] || '';
                            const album = flexColumns[2]?.musicResponsiveListItemFlexColumnRenderer.text.runs[0].text || '';
        
                            Tracks.push({ videoId, title, artists: artistNames, duration, thumbnails, params: '', playerParams: '', album, views });

                        } else if ((subtitleRuns || [])[0]?.text === 'Album') {
                            
                            const title = titleRun.text;
                            const year = subtitleRuns.find((run: any) => !isNaN(run.text))?.text || '';
                            const browseId = suggestion.musicResponsiveListItemRenderer.navigationEndpoint?.browseEndpoint?.browseId;
        
                            Albums.push({ browseId, title, thumbnails, year });

                        }
                    
                    }
                    
                });

            }
            
        });
    
    return { Suggestions, Tracks, Albums };

};
      
export async function GetSearchBasedSuggestions(
    input: string,
    context: any,
    proxy: { Host: string; Port: number; UserPass?: string } | undefined
  ): Promise<{ Suggestions: SearchSuggestion[]; Tracks: SuggestedTrack[]; Albums: SuggestedAlbum[] }> {
    const requestBody = {
      input,
      context: {
        ...context,
        client: {
          ...context.client,
          clientName: 'WEB_REMIX',
          clientVersion: '1.20240403.01.00',
        },
      },
    };
  
    try {
      const response = await got.post(
        'https://music.youtube.com/youtubei/v1/music/get_search_suggestions',
        {
          json: requestBody,
          searchParams: {
            alt: 'json',
            key: 'AIzaSyC9XL3ZjWddXya6X74dJoCTL-AF99BVI6E',
          },
          headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
            origin: 'https://music.youtube.com',
          },
          agent: proxy
            ? {
                https: new HttpsProxyAgent({
                  proxy: `http://${
                    proxy.UserPass ? proxy.UserPass + '@' : ''
                  }${proxy.Host}:${proxy.Port}`,
                }),
              }
            : undefined,
        }
      );
  
      const responseData = JSON.parse(response.body);
      return ParseSearchSuggestionsResponse(responseData);
    } catch (error) {
      console.error('Error in GetSearchBasedSuggestions:', error);
      throw error;
    }
}