const errorMiddleware = (err, req, res, next) => {
  console.error(err);

  res.status(err.status || 500).json({
    status: 'error',
    error: err.name || 'Internal Server Error',
    message: err.message || 'Internal Server Error'
  });
}

export default errorMiddleware;