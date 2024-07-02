import { SearchForMusicVideos } from "./searchMusics.js";

const query = 'never gonna give you up';

SearchForMusicVideos(query).then((songs) => {
  console.log(songs);
});