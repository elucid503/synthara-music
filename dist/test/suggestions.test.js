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
import { getSuggestions } from '../suggestions.js';
test('Should always return a list of suggestions', () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield getSuggestions('ronQgBo0ZCY');
    expect(result.length).toBeGreaterThan(1);
}));
