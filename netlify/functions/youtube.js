exports.handler = async function() {
  const YT_API = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${process.env.CHANNEL_ID}&key=${process.env.YT_API_KEY}`

  const response = await fetch(YT_API)
  const data = await response.json()
  const ytItems = data.items
  const viewCount = ytItems[0].statistics.viewCount
  const ytURL = {
    "number": `${viewCount}`
  }

  return {
    statusCode: 200,
    body: JSON.stringify(ytURL),
    headers: {
			'Content-Type': 'application/json'
		},
  }
}