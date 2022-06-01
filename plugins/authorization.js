//Plugin to validate autorization header

const { createProxyMiddleware } = require('http-proxy-middleware');

function load(app) {
    app.server.use('', (req, res, next) => {
        //just check if there is an authorization header        
        if (req.headers.authorization) {
            next();
        } else {
            res.sendStatus(403);
        }
    });
  }

//nothing to do on unload
function unload(app) {  
}

module.exports = {
load,
unload
};