import { LOG_LEVEL, NODE_ENV } from "../../config/env.config.js";
import { APP_NAME } from "../../shared/constants/app.constants.js";

const loggerConfig = {
  level: LOG_LEVEL,
  handleExceptions: true,
  handleRejections: true,
  defaultMeta: {
    service: APP_NAME,
  },
  silent: NODE_ENV === "test",
  exitOnError: false,
};

export default loggerConfig;
