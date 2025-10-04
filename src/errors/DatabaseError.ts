export class DatabaseError extends Error {
  public code: string;
  public status: number;

  constructor(message: string, code = 'DB_ERROR', status = 500) {
    super(message);
    this.name = 'DatabaseError';
    this.code = code;
    this.status = status;

    // Mantener el stack trace limpio
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, DatabaseError);
    }
  }
}
