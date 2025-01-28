import { Response } from 'express';

export class ApiResponse {
  static success<T>(res: Response, data: T, message?: string) {
    return res.json({
      status: 'success',
      data,
      message,
      timestamp: new Date().toISOString()
    });
  }

  static error(
    res: Response,
    statusCode: number,
    message: string,
    details?: any
  ) {
    return res.status(statusCode).json({
      status: 'error',
      message,
      details,
      timestamp: new Date().toISOString()
    });
  }

  static validationError(res: Response, details: any) {
    return this.error(res, 400, 'Validation Error', details);
  }

  static notFound(res: Response, message = 'Resource not found') {
    return this.error(res, 404, message);
  }

  static unauthorized(res: Response, message = 'Unauthorized') {
    return this.error(res, 401, message);
  }

  static forbidden(res: Response, message = 'Forbidden') {
    return this.error(res, 403, message);
  }

  static serverError(res: Response, error: Error) {
    console.error('Server Error:', error);
    
    const details = process.env.NODE_ENV === 'development'
      ? {
          stack: error.stack,
          name: error.name,
          message: error.message
        }
      : undefined;

    return this.error(
      res,
      500,
      'Internal Server Error',
      details
    );
  }
}