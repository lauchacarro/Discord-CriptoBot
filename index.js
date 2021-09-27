const fetch = require('node-fetch')

const currenciesNames = ["bitcoin", "cardano", "solana", "binancecoin", "matic-network", "hive", "plant-vs-undead-token", "cryptozoon", "smooth-love-potion", "axie-infinity"]
const currenciesAbreb = ["BTC", "ADA", "SOL", "BNB", "MATIC", "HIVE", "PVU", "ZOON", "SLP", "AXS"]


const url = `https://api.coingecko.com/api/v3/simple/price?ids=${currenciesNames.join(",")}&vs_currencies=usd&include_last_updated_at=true`



const requestData = (callback) => {
    fetch(url)
        .then(response => response.json())
        .then(data => callback(data))
}

exports.requestData = requestData;
exports.currencies = {names: currenciesNames, abreb: currenciesAbreb}

