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
        handleCommands(bot, chatId, resp);
      });
      
}

// processing of the commands from Telegram input
var handleCommands = function(telBot, msg, chatId) {
  if (msg == "/start") {
      telBot.sendMessage(chatId, "Starting of the bot...")
  }
}

const response = () => new Promise((resolve, reject) => {
  fetch(process.env.TSL_API_URL, options)
            .then(response => response.json())
            .then(json => resolve(json))
            .catch(error => reject(error));
});

module.exports = {
    recv,
    response,
}