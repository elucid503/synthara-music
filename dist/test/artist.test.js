var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { test, expect } from 'vitest';
import { getArtist } from '../getArtist.js';
import { searchArtists } from '../searchArtists.js';
import { searchMusics } from '../searchMusics.js';
test('Search for Dua Lipa and get more data', () => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const query = 'Dua Lipa';
    const results = yield searchArtists(query);
    expect(results.length).toBeGreaterThanOrEqual(1);
    const firstResult = results[0];
    expect(firstResult).toBeDefined();
    const data = yield getArtist((_a = firstResult.artistId) !== null && _a !== void 0 ? _a : '');
    expect(data).toBeDefined();
    expect((_b = data.suggestedArtists) === null || _b === void 0 ? void 0 : _b.length).toBeGreaterThanOrEqual(1);
    expect((_c = data.albums) === null || _c === void 0 ? void 0 : _c.length).toBeGreaterThanOrEqual(1);
    expect((_d = data.singles) === null || _d === void 0 ? void 0 : _d.length).toBeGreaterThanOrEqual(1);
}));
test('Parse artist for songs whose artist does not have a navigationEndpoint', () => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    const query = 'Running in the 90s';
    const results = yield searchMusics(query);
    expect(results.length).toBeGreaterThanOrEqual(1);
    const firstResult = results[0];
    expect(firstResult).toBeDefined();
    expect((_e = firstResult.artists) === null || _e === void 0 ? void 0 : _e.length).toBeGreaterThanOrEqual(1);
}));
