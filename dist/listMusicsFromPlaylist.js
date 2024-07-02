var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import got from 'got';
import { HttpsProxyAgent } from 'hpagent';
import context from './context.js';
import { parseMusicInPlaylistItem } from './parsers.js';
export const parseListMusicsFromPlaylistBody = (body) => {
    var _a;
    const content = body.contents.singleColumnBrowseResultsRenderer.tabs[0].tabRenderer.content
        .sectionListRenderer.contents[0];
    const { contents } = (_a = content.musicPlaylistShelfRenderer) !== null && _a !== void 0 ? _a : content.musicCarouselShelfRenderer;
    const results = [];
    contents.forEach((content) => {
        try {
            const song = parseMusicInPlaylistItem(content);
            if (song) {
                results.push(song);
            }
        }
        catch (e) {
            console.error(e);
        }
    });
    return results;
};
export function ListMusicVideosFromPlaylist(playlistId, proxy) {
    return __awaiter(this, void 0, void 0, function* () {
        let browseId;
        if (!playlistId.startsWith('VL')) {
            browseId = 'VL' + playlistId;
        }
        try {
            const response = yield got.post('https://music.youtube.com/youtubei/v1/browse', {
                json: Object.assign(Object.assign({}, context.body), { browseId }),
                searchParams: {
                    alt: 'json',
                    key: 'AIzaSyC9XL3ZjWddXya6X74dJoCTL-WEYFDNX30',
                },
                headers: {
                    'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
                    origin: 'https://music.youtube.com',
                },
                agent: proxy
                    ? {
                        https: new HttpsProxyAgent({
                            proxy: `http://${proxy.UserPass ? proxy.UserPass + '@' : ''}${proxy.Host}:${proxy.Port}`,
                        }),
                    }
                    : undefined,
            });
            return parseListMusicsFromPlaylistBody(JSON.parse(response.body));
        }
        catch (error) {
            console.error(`Error in listMusicsFromPlaylist: ${error}`);
            return [];
        }
    });
}
