import got from 'got';
import { HttpsProxyAgent } from 'hpagent';
import context from './context.js';
import { MusicVideo } from './models.js';
import { parseMusicInPlaylistItem } from './parsers.js';

export const parseListMusicsFromPlaylistBody = (body: {
  contents: {
    singleColumnBrowseResultsRenderer: {
      tabs: {
        tabRenderer: {
          content: {
            sectionListRenderer: {
              contents: {
                musicPlaylistShelfRenderer?: { contents: [] };
                musicCarouselShelfRenderer: { contents: [] };
              }[];
            };
          };
        };
      }[];
    };
  };
}): MusicVideo[] => {
  const content =
    body.contents.singleColumnBrowseResultsRenderer.tabs[0].tabRenderer.content
      .sectionListRenderer.contents[0];
  const { contents } =
    content.musicPlaylistShelfRenderer ?? content.musicCarouselShelfRenderer;
  const results: MusicVideo[] = [];
  contents.forEach((content: any) => {
    try {
      const song = parseMusicInPlaylistItem(content);
      if (song) {
        results.push(song);
      }
    } catch (e) {
      console.error(e);
    }
  });
  return results;
};

export async function ListMusicVideosFromPlaylist(
  playlistId: string,
  proxy: { Host: string; Port: number; UserPass?: string } | undefined
): Promise<MusicVideo[]> {
  let browseId;
  if (!playlistId.startsWith('VL')) {
    browseId = 'VL' + playlistId;
  }

  try {
    const response = await got.post(
      'https://music.youtube.com/youtubei/v1/browse',
      {
        json: {
          ...context.body,
          browseId,
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

    return parseListMusicsFromPlaylistBody(JSON.parse(response.body));
  } catch (error) {
    console.error(`Error in listMusicsFromPlaylist: ${error}`);
    return [];
  }
}