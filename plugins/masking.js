//Plugin that maskis both the origin and the destination

const { createProxyMiddleware } = require('http-proxy-middleware');

const API_SERVICE_URL = "https://jsonplaceholder.typicode.com";

function load(app) {

    //receive a request for json_placeholder and the server sent the same request to the API_SERVICE_URL
    //masking the origin and returning the response
    app.server.use('/json_placeholder', createProxyMiddleware({
        target: API_SERVICE_URL,
        changeOrigin: true,
        pathRewrite: {
            [`^/json_placeholder`]: '',
        },
    }));
  }

//nothing to do on unload
function unload(app) {  
}

module.exports = {
load,
unload
};