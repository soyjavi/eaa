import onFinished from 'on-finished';

export default (req, res, next) => {
  const { originalUrl = '' } = req;
  const today = new Date();
  const timestamp = today.getTime();

  // Set permissive CORS header - this allows this server to be used only as
  // an API server in conjunction with something like webpack-dev-server.
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Disable caching so we'll always get the latest comments.
  res.setHeader('Cache-Control', 'no-cache');

  req.props = Object.assign({}, req.params, req.query, req.body);

  onFinished(res, () => {
    console.log(`${req.method} ${originalUrl} ${res.statusCode} - - ${new Date().getTime() - timestamp} ms`);
  });

  next();
};
