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
export function ParseSearchSuggestionsResponse(responseData) {
    const Suggestions = [];
    const Tracks = [];
    const Albums = [];
    const contents = responseData.contents;
    contents.forEach((content) => {
        if (content.searchSuggestionsSectionRenderer) {
            const suggestions = content.searchSuggestionsSectionRenderer.contents;
            suggestions.forEach((suggestion) => {
                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
                if (suggestion.searchSuggestionRenderer) {
                    const query = suggestion.searchSuggestionRenderer.navigationEndpoint.searchEndpoint.query;
                    const runs = suggestion.searchSuggestionRenderer.suggestion.runs;
                    Suggestions.push({ query, runs });
                }
                if (suggestion.musicResponsiveListItemRenderer) {
                    const flexColumns = suggestion.musicResponsiveListItemRenderer.flexColumns;
                    const thumbnails = suggestion.musicResponsiveListItemRenderer.thumbnail.musicThumbnailRenderer.thumbnail.thumbnails;
                    const titleRun = flexColumns[0].musicResponsiveListItemFlexColumnRenderer.text.runs[0];
                    const subtitleRuns = flexColumns[1].musicResponsiveListItemFlexColumnRenderer.text.runs;
                    if (((_a = (subtitleRuns || [])[0]) === null || _a === void 0 ? void 0 : _a.text) === 'Song') {
                        const title = titleRun.text;
                        const artistNames = subtitleRuns.filter((run, index) => index % 2 === 0 && index !== 0).map((run) => run.text);
                        artistNames.pop(); // Remove the last, which will always be the number of plays
                        const videoId = ((_g = (_f = (_e = (_d = (_c = (_b = suggestion.musicResponsiveListItemRenderer.overlay) === null || _b === void 0 ? void 0 : _b.musicItemThumbnailOverlayRenderer) === null || _c === void 0 ? void 0 : _c.content) === null || _d === void 0 ? void 0 : _d.musicPlayButtonRenderer) === null || _e === void 0 ? void 0 : _e.playNavigationEndpoint) === null || _f === void 0 ? void 0 : _f.watchEndpoint) === null || _g === void 0 ? void 0 : _g.videoId) || '';
                        const duration = ((_h = subtitleRuns.find((run) => run.text.includes(':'))) === null || _h === void 0 ? void 0 : _h.text) || '';
                        const views = ((_j = subtitleRuns.find((run) => run.text.includes('plays'))) === null || _j === void 0 ? void 0 : _j.text.split(' ')[0]) || '';
                        const album = ((_k = flexColumns[2]) === null || _k === void 0 ? void 0 : _k.musicResponsiveListItemFlexColumnRenderer.text.runs[0].text) || '';
                        Tracks.push({ videoId, title, artists: artistNames, duration, thumbnails, params: '', playerParams: '', album, views });
                    }
                    else if (((_l = (subtitleRuns || [])[0]) === null || _l === void 0 ? void 0 : _l.text) === 'Album') {
                        const title = titleRun.text;
                        const year = ((_m = subtitleRuns.find((run) => !isNaN(run.text))) === null || _m === void 0 ? void 0 : _m.text) || '';
                        const browseId = (_p = (_o = suggestion.musicResponsiveListItemRenderer.navigationEndpoint) === null || _o === void 0 ? void 0 : _o.browseEndpoint) === null || _p === void 0 ? void 0 : _p.browseId;
                        Albums.push({ browseId, title, thumbnails, year });
                    }
                }
            });
        }
    });
    return { Suggestions, Tracks, Albums };
}
;
export function GetSearchBasedSuggestions(input, context, proxy) {
    return __awaiter(this, void 0, void 0, function* () {
        const requestBody = {
            input,
            context: Object.assign(Object.assign({}, context), { client: Object.assign(Object.assign({}, context.client), { clientName: 'WEB_REMIX', clientVersion: '1.20240403.01.00' }) }),
        };
        try {
            const response = yield got.post('https://music.youtube.com/youtubei/v1/music/get_search_suggestions', {
                json: requestBody,
                searchParams: {
                    alt: 'json',
                    key: 'AIzaSyC9XL3ZjWddXya6X74dJoCTL-AF99BVI6E',
                },
                headers: {
                    'Content-Type': 'application/json',
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
            const responseData = JSON.parse(response.body);
            return ParseSearchSuggestionsResponse(responseData);
        }
        catch (error) {
            console.error('Error in GetSearchBasedSuggestions:', error);
            throw error;
        }
    });
}
