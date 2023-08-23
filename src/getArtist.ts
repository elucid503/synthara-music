import fetch from 'node-fetch';
import context from './context.js';
import { Artist } from './models.js';
import { parseArtistData } from './parsers.js';

export async function getArtist(
  artistId: string,
  options?: {
    lang: string;
    country: string;
  }
): Promise<Artist> {
  const response = await fetch(
    'https://music.youtube.com/youtubei/v1/browse?key=AIzaSyC9XL3ZjWddXya6X74dJoCTL-WEYFDNX30',
    {
      method: "POST",
      body: JSON.stringify({
        ...context.body,
        browseId: artistId,
      }),
      headers: {
        'User-Agent':
          'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
        'Accept-Language': options?.lang ?? 'en',
        origin: 'https://music.youtube.com',
      },
    }
  );

  try {
    let JsonData = await response.json();
    
    if (!JsonData) { 
      throw new Error('No data returned from YouTube Music API');
    }

    return parseArtistData(JsonData as any, artistId);
  } catch (e) {
    console.error(e);
    return {};
  }
}
