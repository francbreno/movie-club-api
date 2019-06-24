class ValidationError extends Error {
  constructor(messages, status) {
    super(messages);
    // Excludes this constructor from the stacktrace
    Error.captureStackTrace(this, this.constructor);

    this.name = this.constructor.name;
    this.errors = messages || [];
    this.status = status || 500;
  }
}

module.exports = ValidationError;
