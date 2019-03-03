const TelegramBot = require('node-telegram-bot-api');
const fetch = require('node-fetch');

const bot = new TelegramBot(process.env.TELEGRAM_KEY, {polling: true});

const options = {
    headers: {
      Accept: 'application/json',
      'User-Agent': 'My Library (telegram-serverless)',
    },
  };

var recv = function(){
    bot.onText(/\/tslss (.+)/, (msg, match) => {
        const chatId = msg.chat.id;
        const resp = match[1];
        bot.sendMessage(chatId, resp);
      });
      
}

const response = () => new Promise((resolve, reject) => {
  fetch(process.env.JOKES_API_URL, options)
            .then(response => response.json())
            .then(json => resolve(json))
            .catch(error => reject(error));
});

module.exports = {
    recv,
    response,
}