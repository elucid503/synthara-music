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
import context from './context.js';
import { parseArtistData } from './parsers.js';
export function GetArtist(artistId, options) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('https://music.youtube.com/youtubei/v1/browse?key=AIzaSyC9XL3ZjWddXya6X74dJoCTL-WEYFDNX30', {
            method: "POST",
            body: JSON.stringify(Object.assign(Object.assign({}, context.body), { browseId: artistId })),
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
                'Accept-Language': (_a = options === null || options === void 0 ? void 0 : options.lang) !== null && _a !== void 0 ? _a : 'en',
                origin: 'https://music.youtube.com',
            },
        });
        try {
            let JsonData = yield response.json();
            if (!JsonData) {
                throw new Error('No data returned from YouTube Music API');
            }
            return parseArtistData(JsonData, artistId);
        }
        catch (e) {
            console.error(e);
            return {};
        }
    });
}
