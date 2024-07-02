import got from 'got';
import { HttpsProxyAgent } from 'hpagent';

import { MusicVideo } from './models.js';
import { parseSuggestionItem } from './parsers.js';
import context from './context.js';

export const parseGetSuggestionsBody = (body: {
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

export async function GetMusicVideoBasedSuggestions(videoId: string, proxy: { Host: string, Port: number, UserPass?: string } | undefined): Promise<MusicVideo[]> {
  const response = await got.post(
    'https://music.youtube.com/youtubei/v1/next',
    {
      json: {
        ...context.body,
        enablePersistentPlaylistPanel: true,
        isAudioOnly: true,
        params: 'mgMDCNgE',
        playerParams: 'igMDCNgE',
        tunerSettingValue: 'AUTOMIX_SETTING_NORMAL',
        playlistId: `RDAMVM${videoId}`,
        videoId,
      },
      searchParams: {
        alt: 'json',
        key: 'AIzaSyC9XL3ZjWddXya6X74dJoCTL-WEYFDNX30',
      },
      headers: {
        'User-Agent':
          'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
        origin: 'https://music.youtube.com',
      },
      agent: proxy ? {
        https: new HttpsProxyAgent({ proxy: `http://${proxy.UserPass ? proxy.UserPass + '@' : ''}${proxy.Host}:${proxy.Port}` })
      } : undefined
    }
  );
  try {
    return parseGetSuggestionsBody(JSON.parse(response.body));
  } catch {
    return [];
  }
}