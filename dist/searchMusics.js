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
import { parseMusicItem } from './parsers.js';
import context from './context.js';
export const parseSearchMusicsBody = (body) => {
    const { contents } = body.contents.tabbedSearchResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents.pop()
        .musicShelfRenderer;
    const results = [];
    contents.forEach((content) => {
        try {
            const song = parseMusicItem(content);
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
export function SearchForMusicVideos(query, proxy) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = 'https://music.youtube.com/youtubei/v1/search?alt=json';
        const body = Object.assign(Object.assign({}, context.body), { params: 'EgWKAQIIAWoKEAoQCRADEAQQBQ%3D%3D', query, originalQuery: query, searchMethod: "ENTER_KEY", validationStatus: "VALID" });
        const headers = {
            'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
            'Origin': 'https://music.youtube.com',
        };
        const options = {
            method: 'POST',
            headers,
            json: body,
            responseType: 'json',
        };
        if (proxy) {
            options.agent = {
                https: new HttpsProxyAgent({ proxy: `http://${proxy.UserPass ? proxy.UserPass + '@' : ''}${proxy.Host}:${proxy.Port}` })
            };
        }
        try {
            const response = yield got(url, options);
            return parseSearchMusicsBody(response.body);
        }
        catch (error) {
            console.error('Error fetching data:', error);
            return [];
        }
    });
}
