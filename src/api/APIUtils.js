import axios from 'axios';

const currencies = ['usd','brl','eur'];

const createURL = (listOfCurrencies) => {
  const prefix = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=';

  let url = prefix;

  for (let i = 0; i < currencies.length; i++) {
    url = url + currencies[i];
    if (i !== currencies.length - 1) {
      url = url + '%2C'
    }
  }

  return url
}

const getBTCPriceData = async (currencies) => {
  const url = createURL(currencies);
  const res = await axios.get(url)

  return res.data;
}

export default getBTCPriceData;
