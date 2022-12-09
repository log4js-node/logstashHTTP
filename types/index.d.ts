import type { Agent as httpAgent } from "http";
import type { Agent as httpsAgent } from "https";

export interface LogstashHTTPAppender {
  type: "@log4js-node/logstash-http";
  url: string;
  timeout?: number; //defaults to 5000
  application?: string;
  logChannel?: string;
  logType?: string;
  /** An http.Agent or https.Agent to allow configuring behavior as needed.
   * Make sure you use the correct type base on your url
   */
  agent?: httpAgent | httpsAgent;
}

// Add the LogstashHTTPAppender to the list of appenders in log4js for better type support
declare module "log4js" {
  export interface Appenders {
    LogstashHTTPAppender: LogstashHTTPAppender;
  }
}
