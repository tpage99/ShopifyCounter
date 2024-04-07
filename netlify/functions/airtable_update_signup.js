const Airtable = require('airtable');
const base = new Airtable({apiKey: 'AIRTABLE_SIGNUP_TOKEN'}).base('appvMCfxB0T6vV1TB');

export const handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method Not Allowed" };
  }
  const incomingData = JSON.parse(event.body);
  console.log(incomingData);
  const name = incomingData.name;
  const email = incomingData.email;
  const signupTime = incomingData.created_at;

  console.log(`Updating table with: name: ${name} email: ${email} signed up date/time: ${signupTime}`);
  
  base('Imported table').create([
    {
      "fields": {
        "name": `${name}`,
        "email": `${email}`,
        "signed up date/time": `${signupTime}`
      }
    }
  ], function(err, records) {
    if (err) {
      console.error(err);
      return;
    }
    records.forEach(function (record) {
      console.log(record.getId());
    });
  });
};




