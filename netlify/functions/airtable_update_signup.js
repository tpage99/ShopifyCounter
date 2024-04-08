const Airtable = require('airtable');

export const handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method Not Allowed" };
  }
  const incomingData = JSON.parse(event.body);
  console.log(incomingData);
  const airtableToken = process.env.AIRTABLE_SIGNUP_TOKEN;
  const name = incomingData.name;
  const email = incomingData.email;
  const signupTime = incomingData.created_at;
  const base = new Airtable({apiKey: airtableToken}).base('appvMCfxB0T6vV1TB');

  console.log(`Updating table with: name: ${name} email: ${email} signed up date/time: ${signupTime}`);
  
  base('Imported table').create([
    {
      "fields": {
        "name": `${name}`,
        "email": `${email}`,
        "signed up date/time": `${signupTime}`
      }
    }
  ], function(err, record) {
    if (err) {
      console.error(err);
      return;
    }
    console.log(record.getId());
  });
};




