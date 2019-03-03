'use strict';

const { recv, response } = require('./telegram/telegram');

module.exports.run = (event, context, callback) => {
      recv(event)
        .then((response) => {
          console.log(JSON.stringify(response));
          return callback(null, { statusCode: json.status, body: JSON.stringify({ message: response }) });
        })
        .catch((error) => {
          console.error(error);
          return callback(null, { statusCode: 500, body: JSON.stringify({ error }) });
        });
};