import got from 'got';
import { HttpsProxyAgent } from 'hpagent';
import context from './context.js';
import { ArtistPreview } from './models.js';
import { parseArtistSearchResult } from './parsers.js';

export const parseArtistsSearchBody = (body: any): ArtistPreview[] => {
  const { contents } =
    body.contents.tabbedSearchResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents.pop()
      .musicShelfRenderer;
  const results: ArtistPreview[] = [];
  contents.forEach((content: any) => {
    try {
      const artist = parseArtistSearchResult(content);
      if (artist) {
        results.push(artist);
      }
    } catch (err) {
      console.error(err);
    }
  });
  return results;
};

export async function SearchForArtists(
  query: string,
  proxy: { Host: string; Port: number; UserPass?: string } | undefined,
  options?: {
    lang?: string;
    country?: string;
  }
): Promise<ArtistPreview[]> {
  try {
    const response = await got.post(
      'https://music.youtube.com/youtubei/v1/search',
      {
        json: {
          ...context.body,
          params: 'EgWKAQIgAWoKEAMQBBAJEAoQBQ%3D%3D',
          query,
        },
        searchParams: {
          alt: 'json',
          key: 'AIzaSyC9XL3ZjWddXya6X74dJoCTL-WEYFDNX30',
        },
        headers: {
          'User-Agent':
            'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
          'Accept-Language': options?.lang ?? 'en',
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

    return parseArtistsSearchBody(JSON.parse(response.body));
  } catch (e) {
    console.error(e);
    return [];
  }
}