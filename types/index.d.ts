import type { Agent as httpAgent } from "http";
import type { Agent as httpsAgent } from "https";

export interface LogstashHTTPAppender extends Appender {
  type: "@log4js-node/logstashHTTP";
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
