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
import { listMusicsFromAlbum } from '../listMusicsFromAlbum.js';
import { searchAlbums } from '../searchAlbums.js';
test('Search for Heaven & Hell album, pick first and get song list', () => __awaiter(void 0, void 0, void 0, function* () {
    const query = 'Heaven & Hell';
    const results = yield searchAlbums(query);
    expect(results.length).toBeGreaterThan(1);
    const firstAlbum = results.shift();
    expect(firstAlbum).toBeDefined();
    const albumId = firstAlbum === null || firstAlbum === void 0 ? void 0 : firstAlbum.albumId;
    expect(albumId).toBeDefined();
    const songsResult = yield listMusicsFromAlbum(albumId !== null && albumId !== void 0 ? albumId : '');
    expect(songsResult.length).toBeGreaterThan(0);
}));
