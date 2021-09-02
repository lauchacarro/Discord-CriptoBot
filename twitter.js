const { requestData, currencies } = require('./index')


const processData = data => {
    const message = buildMessage(data);
    sendTweet(message);
}


const buildMessage = (data) => {
    let message = "";

    for (const name of currencies.names) {
        const amount = data[name];

        message = message + `[${currencies.abreb[currencies.names.indexOf(name)]}](https://www.coingecko.com/es/monedas/${name}): ${amount.usd}\n`;
    }
    return message;
}


const sendTweet = message => {
    const Twitter = require("twitter");

    const client = new Twitter({
        consumer_key: process.env.CONSUMERKEY,
        consumer_secret: process.env.CONSUMERSECRET,
        access_token_key: process.env.ACCESSTOKENKEY,
        access_token_secret: process.env.ACCESSTOKENSECRET
    })

    client.post("statuses/update", {
        status: message
    }).then(tweet => {
        console.log(tweet)
    })
        .catch(error => console.log(error))

}

requestData(processData)