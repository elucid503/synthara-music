import fetch from 'node-fetch';
import { MusicVideo } from './models.js';
import { parseSuggestionItem } from './parsers.js';
import context from './context.js';

const parseGetSuggestionsBody = (body: {
  contents: {
    singleColumnMusicWatchNextResultsRenderer: {
      tabbedRenderer: {
        watchNextTabbedResultsRenderer: {
          tabs: {
            tabRenderer: {
              content: {
                musicQueueRenderer: {
                  content: { playlistPanelRenderer: { contents: [] } };
                };
              };
            };
          }[];
        };
      };
    };
  };
}): MusicVideo[] => {
  const { contents } =
    body.contents.singleColumnMusicWatchNextResultsRenderer.tabbedRenderer
      .watchNextTabbedResultsRenderer.tabs[0].tabRenderer.content
      .musicQueueRenderer.content.playlistPanelRenderer;

  const results: MusicVideo[] = [];

  contents.forEach((content: any) => {
    try {
      const video = parseSuggestionItem(content);
      if (video) {
        results.push(video);
      }
    } catch (e) {
      console.error(e);
    }
  });
  return results;
};

export async function GetTailoredSuggestionsWithPriority(Seeds: { VideoID: string; Skipped: boolean }[]): Promise<MusicVideo[]> {
    
    const responsiveSignals = {

        videoInteraction: Seeds.map((Seed, index) => {

            const baseInteraction = {

                queueImpress: {},
                videoId: Seed.VideoID,
                queueIndex: index,
            
            };

            if (Seed.Skipped) {

            return [baseInteraction, {
                
                playbackSkip: {},
                videoId: Seed.VideoID,
                queueIndex: index,
                
            }]; // Only add the playbackSkip interaction if the priority is less than 1
            
            } else { return baseInteraction; }

        }).flat(),
        
    };
  
    const response = await fetch(
      `https://music.youtube.com/youtubei/v1/next?alt=json&key=AIzaSyC9XL3ZjWddXya6X74dJoCTL`,
      {
        method: "POST",
        body: JSON.stringify({
          ...context.body,
          enablePersistentPlaylistPanel: true,
          isAudioOnly: true,
          params: 'mgMDCNgE',
          playerParams: 'igMDCNgE',
          tunerSettingValue: 'AUTOMIX_SETTING_NORMAL',
          videoId: Seeds[Seeds.length - 1].VideoID,
          responsiveSignals,
        }),
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
          origin: 'https://music.youtube.com',
        },
      }
    );
  
    try {

        return parseGetSuggestionsBody(await response.json() as any);
        
    } catch {

        return [];
        
    }

}