import { SearchForMusicVideos } from "./searchMusics.js";

const query = 'never gonna give you up';

const proxy =  {

    "Host": "161.77.153.89",
    "Port": 12323,
    "UserPass": "14ae615cd92ce:160911818e"

}

SearchForMusicVideos(query, proxy).then((songs) => {
  console.log(songs.length);
});