import fetch from 'node-fetch'

export const handler = async (event, context) => {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }
    const slackURL = process.env.SLACK_CUSTOMER_UPDATE_WEBHOOK_URL;
    const incomingData = JSON.parse(event.body);

    const slackMsg = `New customer update! ${incomingData.first_name} ${incomingData.last_name} just updated their info. Notes on this customer include: ${incomingData.note}.`

    try {
        const response = await fetch(`${slackURL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(slackMsg)
        });

        const responseBody = await response.text();

        return {
            statusCode: 200,
            body: `Data forwarded successfully: ${responseBody}`
        };

    } catch (error) {
        console.error('Error forwarding data:', error);
        return {
            statusCode: 500,
            body: 'Failed to forward data.'
        };
    }
};
