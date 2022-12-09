# logstash Appender (HTTP) for log4js-node

The logstash appenders for [log4js](https://log4js-node.github.io/log4js-node) send NDJSON formatted log events to [logstash](https://www.elastic.co/products/logstash) receivers. This appender uses HTTP to send the events (there is another logstash appender that uses [UDP](https://github.com/log4js-node/logstashUDP)).

```bash
npm install log4js @log4js-node/logstash-http
```

## Configuration

- `type` - `@log4js-node/logstash-http`
- `url` - `string` - logFaces receiver servlet URL
- `application` - `string` (optional) - used to identify your application's logs
- `logChannel` - `string` (optional) - also used to identify your application's logs [but in a more specific way]
- `logType` - `string` (optional) - used for the `type` field in the logstash data
- `timeout` - `integer` (optional, defaults to 5000ms) - the timeout for the HTTP request.
- `agent` - `http.Agent | https.Agent` (optional) - used to configure the requests being sent out if needed.

This appender will also pick up Logger context values from the events, and add them as `p_` values in the logFaces event. See the example below for more details.

# Example (default config)

```javascript
log4js.configure({
  appenders: {
    logstash: {
      type: "@log4js-node/logstash-http",
      url: "http://localhost:9200/_bulk",
      application: "logstash-log4js",
      logType: "application",
      logChannel: "node",
    },
  },
  categories: {
    default: { appenders: ["logstash"], level: "info" },
  },
});

const logger = log4js.getLogger();
logger.addContext("requestId", "123");
logger.info("some interesting log message");
logger.error("something has gone wrong");
```

This example will result in two log events being sent to your `localhost:9200`. Both events will have a `context.requestId` property with a value of `123`.
