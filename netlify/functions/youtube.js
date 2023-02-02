import fetch from 'node-fetch'

const channel_Id = process.env.CHANNEL_ID
const Yt_Api_Key = process.env.YT_API_KEY

const YT_API = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=` + channel_Id + `&key=` + Yt_Api_Key

exports.handler = async (event, context) => {
  try {
    const response = await fetch(YT_API)
    const data = await response.json()
    const ytItems = await data.items
    const viewCount = await ytItems?.[0]?.statistics.viewCount
    const ytViews = new Object();
    ytViews.number = viewCount;

    return {
      statusCode: 200,
      body: JSON.stringify(ytViews),
      headers: {
        'Content-Type': 'application/json'
      }
    }  
  } catch(error){
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Well that did NOT work'})
    }
  }
}