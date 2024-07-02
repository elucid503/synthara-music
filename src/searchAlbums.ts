import got from 'got';
import { HttpsProxyAgent } from 'hpagent';
import context from './context.js';
import { AlbumPreview } from './models.js';
import { parseAlbumItem } from './parsers.js';

export const parseSearchAlbumsBody = (body: any): AlbumPreview[] => {
  const { contents } =
    body.contents.tabbedSearchResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents.pop()
      .musicShelfRenderer;
  const results: AlbumPreview[] = [];
  contents.forEach((content: any) => {
    try {
      const album = parseAlbumItem(content);
      if (album) {
        results.push(album);
      }
    } catch (err) {
      console.error(err);
    }
  });
  return results;
};

export async function SearchForAlbum(
  query: string,
  proxy: { Host: string; Port: number; UserPass?: string } | undefined
): Promise<AlbumPreview[]> {
  try {
    const response = await got.post(
      'https://music.youtube.com/youtubei/v1/search',
      {
        json: {
          ...context.body,
          params: 'EgWKAQIYAWoKEAkQAxAEEAUQCg%3D%3D',
          query,
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

    return parseSearchAlbumsBody(JSON.parse(response.body));
  } catch (e) {
    console.error(e);
    return [];
  }
}