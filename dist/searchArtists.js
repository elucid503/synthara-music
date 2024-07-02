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
import { parseArtistSearchResult } from './parsers.js';
export const parseArtistsSearchBody = (body) => {
    const { contents } = body.contents.tabbedSearchResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents.pop()
        .musicShelfRenderer;
    const results = [];
    contents.forEach((content) => {
        try {
            const artist = parseArtistSearchResult(content);
            if (artist) {
                results.push(artist);
            }
        }
        catch (err) {
            console.error(err);
        }
    });
    return results;
};
export function SearchForArtists(query, proxy, options) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield got.post('https://music.youtube.com/youtubei/v1/search', {
                json: Object.assign(Object.assign({}, context.body), { params: 'EgWKAQIgAWoKEAMQBBAJEAoQBQ%3D%3D', query }),
                searchParams: {
                    alt: 'json',
                    key: 'AIzaSyC9XL3ZjWddXya6X74dJoCTL-WEYFDNX30',
                },
                headers: {
                    'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
                    'Accept-Language': (_a = options === null || options === void 0 ? void 0 : options.lang) !== null && _a !== void 0 ? _a : 'en',
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
            return parseArtistsSearchBody(JSON.parse(response.body));
        }
        catch (e) {
            console.error(e);
            return [];
        }
    });
}
