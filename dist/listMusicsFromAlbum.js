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
import { parseAlbumHeader, parseMusicInAlbumItem } from './parsers.js';
export const parseListMusicsFromAlbumBody = (body) => {
    const { contents } = body.contents.singleColumnBrowseResultsRenderer.tabs[0].tabRenderer.content
        .sectionListRenderer.contents[0].musicShelfRenderer;
    const songs = [];
    const { thumbnailUrl, artist, album } = parseAlbumHeader(body.header);
    contents.forEach((element) => {
        var _a;
        try {
            const song = parseMusicInAlbumItem(element);
            if (song) {
                song.album = album;
                if (((_a = song.artists) === null || _a === void 0 ? void 0 : _a.length) === 0)
                    song.artists = [{ name: artist }];
                song.thumbnailUrl = thumbnailUrl;
                songs.push(song);
            }
        }
        catch (err) {
            console.error(err);
        }
    });
    return songs;
};
export function ListMusicVideosFromAlbum(albumId, proxy) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield got.post('https://music.youtube.com/youtubei/v1/browse', {
                json: Object.assign(Object.assign({}, context.body), { browseId: albumId }),
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
            return parseListMusicsFromAlbumBody(JSON.parse(response.body));
        }
        catch (e) {
            console.error(e);
            return [];
        }
    });
}
