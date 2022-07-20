const express = require('express');
const Plugins = require('./plugins/plugins');
const http = require('http');

const API_SERVICE_URL = "jsonplaceholder.typicode.com";

// Configuration
const PORT = 8001;
const HOST = "localhost";

class App {
  constructor() {

    this.plugins = new Plugins(this);
    this.server = express();
    this.server.use(express.json());
  }

  start() {
    //load all plugins

    // Start the Proxy
    this.server.listen(PORT, HOST, () => {
        console.log(`Starting Proxy at ${HOST}:${PORT}`);
    });
    //proxy
    this.server.use('', async (client_req, client_res) => {  
      let plugins = this.plugins
      //load all request plugins
      let queue_req = await plugins.loadFromRequestConfig(client_req, client_res)
      try{
        await Promise.all(queue_req)      
        //if all plugins finished do:
        let options = {
          hostname: API_SERVICE_URL,
          path: client_req.url,
          method: client_req.method,
          headers: client_req.headers,
        };
        let proxy_request = http.request(options);
        proxy_request.addListener('response', async function (proxy_response) {  
          //load all response plugins
          let queue_res = await plugins.loadFromResponseConfig(client_req, client_res)
          try{
            await Promise.all(queue_res)   
            //if all plugins finished do:
            proxy_response.addListener('data', function(chunk) {
              client_res.write(chunk, 'binary');
            });
            proxy_response.addListener('end', function() {          
              client_res.end();                   
            });
            client_res.writeHead(proxy_response.statusCode, proxy_response.headers);
          }catch(error){
            if(error == '403'){}
            else{
              res.sendStatus(500);
            }        
          };
        });
        client_req.addListener('data', function(chunk) {
          proxy_request.write(chunk, 'binary');
        });
        client_req.addListener('end', function() {
          proxy_request.end();
        });
      }catch(error){
        if(error == '403'){}
        else{
          res.sendStatus(500);
        }        
      };
    });    
  }  

  //Stop all plugins and the server
  stop() {
    if (this.stopped) return;
+   this.plugins.stop();
    console.log('Server stopped');
    this.stopped = true;
    process.exit();
  }
}

const app = new App();
app.start();

["exit", "SIGINT", "SIGUSR1", "SIGUSR2", "SIGTERM", "uncaughtException"].forEach(event => {
  process.on(event, () => app.stop());
});

