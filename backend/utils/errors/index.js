export class BadRequestError extends Error {
  constructor(message = "Bad Request") {
    super(message);
    this.status = 400;
  }
}

export class UnauthorizedError extends Error {
  constructor(message = "Unauthorized") {
    super(message);
    this.status = 401;
  }
}

export class ForbiddenError extends Error {
  constructor(message = "Forbidden") {
    super(message);
    this.status = 403;
  }
}

export class NotFoundError extends Error {
  constructor(message = "Not Found") {
    super(message);
    this.status = 404;
  }
}

export class ConflictError extends Error {
  constructor(message = "Conflict") {
    super(message);
    this.status = 409;
  }
}

export class TooManyRequestsError extends Error {
  constructor(message = "Too Many Requests") {
    super(message);
    this.status = 429;
  }
}

export class InternalServerError extends Error {
  constructor(message = "Internal Server Error") {
    super(message);
    this.status = 500;
  }
}