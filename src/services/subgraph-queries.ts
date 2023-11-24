const axios = require("axios");

async function main() {
  const endpoint =
    "https://api.studio.thegraph.com/query/57887/web3task-mumbai-testnet/version/latest";
  const headers = {
    "content-type": "application/json",
    Authorization: "3b2048f02febad918a35bbafe78b2115",
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
