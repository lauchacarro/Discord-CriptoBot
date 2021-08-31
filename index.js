const fetch = require('node-fetch')

const currenciesNames = ["cardano", "plant-vs-undead-token", "cryptozoon", "smooth-love-potion", "axie-infinity"]
const currenciesAbreb = ["ADA", "PVU", "ZOON", "SLP", "AXS"]


const url = `https://api.coingecko.com/api/v3/simple/price?ids=${currenciesNames.join(",")}&vs_currencies=usd&include_last_updated_at=true`

console.log(url)

fetch(url)
    .then(response => response.json())
    .then(data => processData(data))


const processData = data => {
    const message = buildMessage(data);
    console.log(message)
    sendMessageDiscordBot(message);
}



const sendMessageDiscordBot = (message) => {

    const obj = {
        "content": message,
        "embeds": null
    };
    console.log(JSON.stringify(obj))
    fetch("https://discord.com/api/webhooks/882099198248497172/uLqfStKvOl4bVt8qi6YcSHjapq0IcpDTJUHmDoCOLelXu_7Q8Yn7A8W7r6urXqXQdjVS",
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
    message = message + `${new Date().toLocaleString()}\n\n`

    for (const name of currenciesNames) {
        const amount = data[name];

        message = message + `[${currenciesAbreb[currenciesNames.indexOf(name)]}](https://www.coingecko.com/es/monedas/${name}): ${amount.usd}\n`;
    }
    return message;
}




