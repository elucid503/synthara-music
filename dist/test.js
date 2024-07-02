import { getSuggestions } from "./suggestions.js";
const videoId = "XDMg06hw97U";
getSuggestions(videoId).then((suggestions) => {
    console.log(suggestions);
});
