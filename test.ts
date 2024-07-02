import ytmusic from "ytmusic_api_unofficial";

ytmusic.search('hello', 'song').then((result) => {
	console.log(result);
});