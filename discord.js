const { requestData, currencies } = require('./index')
const fetch = require('node-fetch')

const processData = data => {
    const message = buildMessage(data);
    sendMessageDiscordBot(message);
}


const sendMessageDiscordBot = (message) => {

    const obj = {
        "content": message,
        "embeds": null
    };

    fetch(process.env.WEBHOOK,
        {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })

        .then(response => response.json())
}


const buildMessage = data => {

    let message = "---------------------\n";
    message = message + `${new Date().toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' })}\n\n`

    for (const name of currencies.names) {
        const amount = data[name];

        message = message + `[${currencies.abreb[currencies.names.indexOf(name)]}](https://www.coingecko.com/es/monedas/${name}): ${amount.usd}\n`;
    }
    return message;
}

requestData(processData)