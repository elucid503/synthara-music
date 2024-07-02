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
import { parseSuggestionItem } from './parsers.js';
import context from './context.js';
export const parseGetSuggestionsBody = (body) => {
    const { contents } = body.contents.singleColumnMusicWatchNextResultsRenderer.tabbedRenderer
        .watchNextTabbedResultsRenderer.tabs[0].tabRenderer.content
        .musicQueueRenderer.content.playlistPanelRenderer;
    const results = [];
    contents.forEach((content) => {
        try {
            const video = parseSuggestionItem(content);
            if (video) {
                results.push(video);
            }
        }
        catch (e) {
            console.error(e);
        }
    });
    return results;
};
export function GetMusicVideoBasedSuggestions(videoId, proxy) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield got.post('https://music.youtube.com/youtubei/v1/next', {
            json: Object.assign(Object.assign({}, context.body), { enablePersistentPlaylistPanel: true, isAudioOnly: true, params: 'mgMDCNgE', playerParams: 'igMDCNgE', tunerSettingValue: 'AUTOMIX_SETTING_NORMAL', playlistId: `RDAMVM${videoId}`, videoId }),
            searchParams: {
                alt: 'json',
                key: 'AIzaSyC9XL3ZjWddXya6X74dJoCTL-WEYFDNX30',
            },
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
                origin: 'https://music.youtube.com',
            },
            agent: proxy ? {
                https: new HttpsProxyAgent({ proxy: `http://${proxy.UserPass ? proxy.UserPass + '@' : ''}${proxy.Host}:${proxy.Port}` })
            } : undefined
        });
        try {
            return parseGetSuggestionsBody(JSON.parse(response.body));
        }
        catch (_a) {
            return [];
        }
    });
}
