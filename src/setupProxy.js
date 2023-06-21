const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = app => {
  app.use(
    "/coingecko",
    createProxyMiddleware({
      target: "https://api.coingecko.com/",
      changeOrigin: true,
      pathRewrite: {
        "^/coingecko": "",
      },
    })
  );
};
