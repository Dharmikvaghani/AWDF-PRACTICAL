export const errorHandler = (err, req, res, next) => {
  console.error('[SERVER ERROR]', err.stack || err.message);
  
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(val => val.message);
    return res.status(400).json({ success: false, error: messages.join(', ') });
  }

  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal Server Error'
  });
};
