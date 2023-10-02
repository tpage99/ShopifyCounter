import fetch from 'node-fetch'

export const handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method Not Allowed" };
  }
  const slackURL = process.env.SLACK_CUSTOMER_UPDATE_WEBHOOK_URL;
  const incomingData = JSON.parse(event.body);
  console.log(incomingData);
  const note = incomingData.note ? incomingData.note : "No notes on this customer";
  const orderQuantity = incomingData.order_quantity ? incomingData.order_quantity : 0;
  const slackMsg = {
    "text": `New customer update! ${incomingData.first_name} ${incomingData.last_name} just updated their info. Notes on this customer include: ${note}. ${incomingData.first_name} has made ${orderQuantity} orders. Most recent order: ${incomingData.last_order_name}`
  }

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
