exports.handler = async function() {
  const response = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${process.env.CHANNEL_ID}&key=${process.env.YT_API_KEY}`)
  const data = await response.json()
  console.log(data)
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