import { SearchForMusicVideos } from "./searchMusics.js";

const query = 'never gonna give you up';

SearchForMusicVideos(query,   {

    "Host": "152.89.193.206",
    "Port": 12323,
    "UserPass": "14ae615cd92ce:160911818e"

  },

).then((songs) => {
  console.log(songs);
});