import { HttpError } from 'http-errors';

export const errorHandler = (err, req, res, next) => {
  if (err instanceof HttpError) {
    res.status(err.status).json({
      status: err.status,
      msg: err.message,
      data: err,
    });
    return;
  }

  res.status(500).json({
    status: 500,
    msg: 'Something went wrong',
    data: err.message,
  });
};
