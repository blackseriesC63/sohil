// errorHandlingFile.ts
import { HttpStatus } from '@nestjs/common';

export class CustomError extends Error {
  status: HttpStatus;

  constructor(
    message: string,
    status: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR,
  ) {
    super(message);
    this.status = status;
  }
}

export const handleError = (
  error: Error,
): { message: string; status: number } => {
  let message = 'An unexpected error occurred';
  let status = HttpStatus.INTERNAL_SERVER_ERROR;

  if (error instanceof CustomError) {
    message = error.message;
    status = error.status;
  }

  return { message, status };
};
