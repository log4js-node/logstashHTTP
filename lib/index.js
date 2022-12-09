"use strict";

/**
 * logstashHTTP appender sends JSON formatted log events to logstashHTTP receivers.
 */
const util = require("util");
const axios = require("axios");

function format(logData) {
  return util.format(...logData);
}

/**
 *
 * For HTTP (browsers or node.js) use the following configuration params:
 *   {
 *      "type": "@log4js-node/logstash-http",       // must be present for instantiation
 *      "application": "logstash-test",        // name of the application
 *      "logType": "application",        // type of the application
 *      "logChannel": "test",        // channel of the application
 *      "url": "http://lfs-server/_bulk",  // logstash receiver servlet URL
 *   }
 * @param {import('../types').LogstashHTTPAppender} config
 */
function logstashHTTPAppender(config) {
  const sender = axios.create({
    baseURL: config.url,
    timeout: config.timeout || 5000,
    headers: { "Content-Type": "application/x-ndjson" },
    withCredentials: true,
    // The user should pass in the correct Agent type for their url
    // since their url won't change after config this should be fine
    httpAgent: config.agent,
    httpsAgent: config.agent,
  });

  return function log(event) {
    const logstashEvent = [
      {
        index: {
          _index: config.application,
          _type: config.logType,
        },
      },
      {
        message: format(event.data),
        context: event.context,
        level: event.level.level / 100,
        level_name: event.level.levelStr,
        channel: config.logChannel,
        datetime: new Date(event.startTime).toISOString(),
        extra: {},
      },
    ];
    const logstashJSON = `${JSON.stringify(logstashEvent[0])}\n${JSON.stringify(
      logstashEvent[1]
    )}\n`;

    // send to server
    sender.post("", logstashJSON).catch((error) => {
      if (error.response) {
        // eslint-disable-next-line
        console.error(
          `log4js.logstashHTTP Appender error posting to ${config.url}: ${
            error.response.status
          } - ${JSON.stringify(error.response.data)}`
        );
      } else {
        // eslint-disable-next-line
        console.error(`log4js.logstashHTTP Appender error: ${error.message}`);
      }
    });
  };
}

function configure(config) {
  return logstashHTTPAppender(config);
}

module.exports.configure = configure;
