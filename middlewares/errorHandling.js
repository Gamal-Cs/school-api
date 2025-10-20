function errorHandling(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  const message = err.message || "something wrong";
  const details = err.details || null;
  res.json({
    success: "False",
    message,
    ...details(details && { errors: details }),
  });
}

module.exports = { errorHandling };
