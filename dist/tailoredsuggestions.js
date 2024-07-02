var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import fetch from 'node-fetch';
import { parseSuggestionItem } from './parsers.js';
import context from './context.js';
const parseGetSuggestionsBody = (body) => {
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
export function GetTailoredSuggestionsWithPriority(Seeds) {
    return __awaiter(this, void 0, void 0, function* () {
        const responsiveSignals = {
            videoInteraction: Seeds.map((Seed, index) => {
                const baseInteraction = {
                    queueImpress: {},
                    videoId: Seed.VideoID,
                    queueIndex: index,
                };
                if (Seed.Skipped) {
                    return [baseInteraction, {
                            playbackSkip: {},
                            videoId: Seed.VideoID,
                            queueIndex: index,
                        }]; // Only add the playbackSkip interaction if the priority is less than 1
                }
                else {
                    return baseInteraction;
                }
            }).flat(),
        };
        const response = yield fetch(`https://music.youtube.com/youtubei/v1/next?alt=json&key=AIzaSyC9XL3ZjWddXya6X74dJoCTL`, {
            method: "POST",
            body: JSON.stringify(Object.assign(Object.assign({}, context.body), { enablePersistentPlaylistPanel: true, isAudioOnly: true, params: 'mgMDCNgE', playerParams: 'igMDCNgE', tunerSettingValue: 'AUTOMIX_SETTING_NORMAL', playlistId: `RDAMVM${Seeds.map(Seed => Seed.VideoID).join('')}`, responsiveSignals, watchEndpointMusicSupportedConfigs: {
                    watchEndpointMusicConfig: {
                        hasPersistentPlaylistPanel: true,
                        musicVideoType: "MUSIC_VIDEO_TYPE_OMV"
                    }
                } })),
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
                origin: 'https://music.youtube.com',
            },
        });
        try {
            return parseGetSuggestionsBody(yield response.json());
        }
        catch (_a) {
            return [];
        }
    });
}
