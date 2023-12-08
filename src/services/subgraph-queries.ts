const axios = require("axios");
require('dotenv').config({ path: __dirname + '/../../.env' });

const {ENDPOINT_URL, AUTHORIZATION_kEY} =
	process.env;

async function main() {
 const endpoint = process.env.ENDPOINT_URL;
 const headers = {
  "content-type": "application/json",
  Authorization: process.env.AUTHORIZATION_kEY,
 };

  //Example of query
  const graphqlQuery = {
    operationName: "AuthorizedPersonnelsQuery",
    query: `query {
            authorizePersonnels {
              roleId
              isAuthorized
              authorizedAddress
            }
          }`,
    variables: {},
  };

  const config = {
    url: endpoint,
    method: "post",
    headers: headers,
    data: graphqlQuery,
  };

  try {
    const response = await axios(config);
    console.log(JSON.stringify(response.data, null, 2));
    console.log(response.data.errors);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
