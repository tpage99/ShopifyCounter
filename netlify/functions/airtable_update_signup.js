const Airtable = require('airtable');

const handler = async (event) => {
  // Configure Airtable base connection
  const base = new Airtable({ apiKey: process.env.AIRTABLE_SIGNUP_TOKEN }).base('appvMCfxB0T6vV1TB')

  // Configure table name
  const table = base('Imported table')

  try {
    const { httpMethod } = event
    const incomingData = JSON.parse(event.body);
    console.log(incomingData);
    const name = incomingData.name.toString();
    const email = incomingData.email.toString();
    const signupTime = incomingData.created_at.toString();

    console.log(`Updating table with: name: ${name} email: ${email} signed up date/time: ${signupTime}`);

    // Only allow POST
    if (httpMethod !== "POST") {
      return {
        statusCode: 405,
        body: JSON.stringify({ message: "Method Not Allowed" })
      }
    } else if (!name || !email || !signupTime) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Bad Request" })
      }
    }

    // Create record
    // NOTE: Without `await`, this will not wait until data has been inserted into Airtable and return Status 202 due to async behaviour.
    // As a result, we will receive 202 response code but our data are not inserted into our Airtable base.
    await table
      .create({
        name,
        email,
        signupTime
      })
      .then((rec) => {
        console.log("Successfully inserted into airtable")
      })
      .catch((err) => {
        throw err
      })
    return {
      statusCode: 202,
      body: JSON.stringify({ message: "Accepted" })
    }
  } catch (error) {
    return { statusCode: 500, body: "Oops! Something went wrong." }
  }
}

module.exports = { handler }


