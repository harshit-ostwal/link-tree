const LoggerMessages = {
  Info: {
    SERVER_STARTING: "Server is starting...",
    SERVER_STARTED: "Server started successfully.",
    SERVER_STOPPING: "Server is stopping...",
    SERVER_STOPPED: "Server stopped.",

    DATABASE_CONNECTED: "Database connected successfully.",
    DATABASE_CONNECTING: "Connecting to database...",

    REQUEST_RECEIVED: "Request received.",
    REQUEST_PROCESSED: "Request processed successfully.",
    RESPONSE_SENT: "Response sent.",

    JOB_STARTED: "Background job started.",
    JOB_COMPLETED: "Background job completed.",
    JOB_SCHEDULED: "Job scheduled successfully.",
  },

  Warnings: {
    SERVER_WARNING: "Server warning occurred.",
    DATABASE_WARNING: "Database warning occurred.",
    SLOW_QUERY: "Slow query detected.",
    DEPRECATED_FEATURE: "Deprecated feature used.",
    POTENTIAL_ISSUE: "Potential issue detected.",
    RESOURCE_WARNING: "Resource warning.",
  },

  Errors: {
    SERVER_ERROR: "Server error occurred.",
    DATABASE_ERROR: "Database error occurred.",
    UNCAUGHT_EXCEPTION: "Uncaught exception occurred.",
    UNHANDLED_REJECTION: "Unhandled promise rejection occurred.",

    REQUEST_ERROR: "Request processing error.",
    RESPONSE_ERROR: "Response generation error.",

    JOB_FAILED: "Background job failed.",
    JOB_ERROR: "Job error occurred.",

    CRITICAL_ERROR: "Critical error occurred.",
    FATAL_ERROR: "Fatal error occurred.",
  },

  Debug: {
    FUNCTION_CALLED: "Function called.",
    VARIABLE_VALUE: "Variable value logged.",
    EXECUTION_TIME: "Execution time recorded.",
    STATE_CHANGED: "State changed.",
  },
};

export default LoggerMessages;
