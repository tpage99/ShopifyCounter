import fetch from 'node-fetch'

export const handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method Not Allowed" };
  }
  const slackURL = process.env.SHOPDEV_ALLIANCE_SIGNUP_WEBHOOK_URL;
  const incomingData = JSON.parse(event.body);
  console.log(incomingData);
  const name = incomingData.name;
  const email = incomingData.email;
  const slackMsg = {
    "text": `New recruit! ${name} just requested to join the Alliance 🫡. They can be reached at: ${email}`
  }

  console.log(`Sending the Slack message: ${slackMsg.text}`);

  const response = await fetch(slackURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(slackMsg),
  });
  if (!response.ok) {
    return { statusCode: response.status, body: 'Failed to send data' };
  }
  return { statusCode: 200, body: 'Data sent successfully' };
};
