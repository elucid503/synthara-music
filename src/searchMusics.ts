import Axios from 'axios';
import { HttpsProxyAgent } from 'https-proxy-agent';
import { MusicVideo } from './models.js';
import { parseMusicItem } from './parsers.js';
import context from './context.js';

import { inspect } from 'util';

export const parseSearchMusicsBody = (body: {
  contents: any;
}): MusicVideo[] => {
  const { contents } =
    body.contents.tabbedSearchResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents.pop()
      .musicShelfRenderer;

  const results: MusicVideo[] = [];

  contents.forEach((content: any) => {
    try {
      const song = parseMusicItem(content);
      if (song) {
        results.push(song);
      }
    } catch (e) {
      console.error(e);
    }
  });
  return results;
};

export async function SearchForMusicVideos(query: string, proxy?: { Host: string, Port: number, UserPass: string }): Promise<MusicVideo[]> {

  let response;

  try {

    response = await Axios({

      method: 'POST',
      url: 'https://music.youtube.com/youtubei/v1/search?alt=json',
      data: {
        ...context.body,
        params: 'EgWKAQIIAWoKEAoQCRADEAQQBQ%3D%3D',

        query,
        originalQuery: query,
        searchMethod: "ENTER_KEY",
        validationStatus: "VALID",
      },
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
        origin: 'https://music.youtube.com',
      },
      httpsAgent: proxy ? new HttpsProxyAgent(`http://${proxy.UserPass}@${proxy.Host}:${proxy.Port}`) : undefined

    })

  } catch (e) {

    console.error(e);
    return [];

  }

  console.log(inspect(response.data, false, 5, true));
  
  try {
    return parseSearchMusicsBody(response.data as any);
  } catch {
    return [];
  }
}
