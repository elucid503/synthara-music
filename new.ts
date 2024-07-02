import YTMusic from "ytmusic-api"

const ytmusic = new YTMusic()
await ytmusic.initialize();

ytmusic.search("Never gonna give you up").then(songs => {
	console.log(songs)
})
