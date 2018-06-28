export interface LogstashHTTPAppender extends Appender {
  type: '@log4js-node/logstashHTTP';
  url: string;
  timeout ?: number; //defaults to 5000
  application ?: string;
  logChannel ?: string;
  logType ?: string;
}
