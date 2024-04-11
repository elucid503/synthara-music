import { GetTailoredSuggestionsWithPriority } from "./src/tailoredsuggestions";
import util from "util";

const Seeds = [

  {

    VideoID: "XDMg06hw97U", // Self Love 

    Skipped: false

  },

  // {

  //   VideoID: "yRVotpLaCD4", // Weeknd

  //   Skipped: true

  // },

  // {

  //   VideoID: "3whRyV5XnmE", // Another 

  //   Skipped: false

  // }

];

GetTailoredSuggestionsWithPriority(Seeds).then((results) => {

  console.log(util.inspect(results, false, null, true));

});