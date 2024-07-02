import { SearchSuggestion, SuggestedTrack, SuggestedAlbum } from "./models.js";
export declare function ParseSearchSuggestionsResponse(responseData: any): {
    Suggestions: SearchSuggestion[];
    Tracks: SuggestedTrack[];
    Albums: SuggestedAlbum[];
};
export declare function GetSearchBasedSuggestions(input: string, context: any, proxy: {
    Host: string;
    Port: number;
    UserPass?: string;
} | undefined): Promise<{
    Suggestions: SearchSuggestion[];
    Tracks: SuggestedTrack[];
    Albums: SuggestedAlbum[];
}>;
//# sourceMappingURL=GetSearchBasedSuggestions.d.ts.map