import fetch from 'node-fetch'
exports.handler = async function() {
  const channel_Id = process.env.CHANNEL_ID
  const Yt_Api_Key = process.env.YT_API_KEY

  const YT_API = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channel_Id}&key=${Yt_Api_Key}`
  const response = await fetch(YT_API)
  const data = await response.json()
  const ytItems = data.items
  const viewCount = ytItems?.[0]?.statistics.viewCount
  console.log(viewCount)
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