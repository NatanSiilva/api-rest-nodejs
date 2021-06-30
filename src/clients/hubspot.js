require('dotenv/config');
const axios = require("axios");

class Hubspot {
  
  async connect(data) {
    try {
      const isConnected = await axios({
        method: "post",
        url: `https://api.hubapi.com/contacts/v1/contact/createOrUpdate/email/${data.email}/?hapikey=765db5e2-da5b-4056-a092-b024b499d6c1`,
        data: {
          properties: [
            {
              property: "firstname",
              value: data.name,
            },
            {
              property: "email",
              value: data.email,
            },
            {
              property: "mobilephone",
              value: data.phone,
            },
          ],
        },
      });

      console.log("CONTATO CADASTRADO COM SUCESSO");
      console.log("STATUS:", isConnected.status);
      console.log("DATA:", isConnected.data);

      return isConnected;
    } catch (error) {
      console.log("ERROR:", error.status);
    }
  }
}

module.exports = new Hubspot();
