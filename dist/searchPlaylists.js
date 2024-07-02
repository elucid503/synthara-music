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
import { parsePlaylistItem } from './parsers.js';
export const parseSearchPlaylistsBody = (body, onlyOfficialPlaylists) => {
    var _a;
    const contents = (_a = body.contents.tabbedSearchResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents.pop()
        .musicShelfRenderer) === null || _a === void 0 ? void 0 : _a.contents;
    if (!contents) {
        return [];
    }
    const results = [];
    contents.forEach((content) => {
        try {
            const playlist = parsePlaylistItem(content, onlyOfficialPlaylists);
            if (playlist) {
                results.push(playlist);
            }
        }
        catch (e) {
            console.error(e);
        }
    });
    return results;
};
export function SearchForPlaylists(query, options) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield got.post('https://music.youtube.com/youtubei/v1/search', {
            json: Object.assign(Object.assign({}, context.body), { params: 'EgWKAQIoAWoKEAoQAxAEEAUQCQ%3D%3D', query }),
            searchParams: {
                alt: 'json',
                key: 'AIzaSyC9XL3ZjWddXya6X74dJoCTL-WEYFDNX30',
            },
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
                origin: 'https://music.youtube.com',
            },
            agent: (options === null || options === void 0 ? void 0 : options.proxy)
                ? {
                    https: new HttpsProxyAgent({
                        proxy: `http://${options.proxy.UserPass ? options.proxy.UserPass + '@' : ''}${options.proxy.Host}:${options.proxy.Port}`,
                    }),
                }
                : undefined,
        });
        try {
            return parseSearchPlaylistsBody(JSON.parse(response.body), (_a = options === null || options === void 0 ? void 0 : options.onlyOfficialPlaylists) !== null && _a !== void 0 ? _a : false);
        }
        catch (e) {
            console.error(e);
            return [];
        }
    });
}
