// Activate a netlify function to get an RSS feed (using rss2json as a proxy)
export const fetchFeedFromUrl = async (url) => {
  try {
    // 💯 USING NETLIFY FUNCTIONS TO FETCH RSS FEED WITHOUT LEAKING API KEY
    const request = await fetch(`/.netlify/functions/fetchfeed?url=${url}&offset=0`)
    // console.log(request);

    // If request failed, we do an early return!
    if (request.status !== 200) {
      alert("Couldn't fetch feed from the URL provided. \n\nPlease check whether inputting the URL on https://rss2json.com gives a valid JSON.")
      throw new Error(request.statusText)
    }

    const json = await request.json()
    return json
  } catch (err) {
    console.log(err)
  }
}
