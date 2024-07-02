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
import { listMusicsFromPlaylist } from '../listMusicsFromPlaylist.js';
import { searchPlaylists } from '../searchPlaylists.js';
test('Search for Jazz playlists and the first one should return a list of results', () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const query = 'jazz';
    const results = yield searchPlaylists(query);
    expect(results.length).toBeGreaterThan(1);
    const firstPlaylist = results.shift();
    expect(firstPlaylist).toBeDefined();
    expect(firstPlaylist === null || firstPlaylist === void 0 ? void 0 : firstPlaylist.playlistId).toBeDefined();
    const songsResult = yield listMusicsFromPlaylist((_a = firstPlaylist === null || firstPlaylist === void 0 ? void 0 : firstPlaylist.playlistId) !== null && _a !== void 0 ? _a : '');
    console.log(firstPlaylist === null || firstPlaylist === void 0 ? void 0 : firstPlaylist.playlistId);
    expect(songsResult.length).toBeGreaterThan(1);
}));
