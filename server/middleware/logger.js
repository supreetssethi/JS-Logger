module.exports = function logger() {
  return function log(req, res, next) {
    // eslint-disable-next-line no-console
    console.log(
      `in req ${req.method} ${req.protocol}://${req.hostname}:${req.port}${
        req.path
      }  ${JSON.stringify(req.params)} ${JSON.stringify(res.data)}`,
    );
    // Implement the middleware function based on the options object
    next();
  };
};
