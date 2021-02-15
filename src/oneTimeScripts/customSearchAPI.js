const {google} = require('googleapis');
const customsearch = google.customsearch('v1');
const API_KEY = "AIzaSyB1TtjgdaS-JyFVHFmWz_OMXhg8ft5Tbpw";
const SEARCH_ENGINE_ID = "b322c10bd42a76344";
let queries = ["asa mi asa", "wise and otherwise", "Elon musk", "Shrimanyogi"]

// const options = {
//     q: q,
//     apiKey: API_KEY,
//     cx: SEARCH_ENGINE_ID,
// };

async function fetchResults(options) {
	// console.log(options);
	const res = await customsearch.cse.list({
		cx: options.cx,
		q: options.q,
		auth: options.apiKey,
	});
	const thumbURL = res.data.items[0].pagemap.cse_thumbnail[0].src
	console.log(options.q, " : ", thumbURL);
	return res.data;
}

queries.forEach((query) => {
	const options = {
		q: query,
		apiKey: API_KEY,
		cx: SEARCH_ENGINE_ID,
	};
	fetchResults(options);
})
