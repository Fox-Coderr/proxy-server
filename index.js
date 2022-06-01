const express = require('express');
const morgan = require("morgan");
const Plugins = require('./plugins/plugins');

// Configuration
const PORT = 8001;
const HOST = "localhost";

class App {
  constructor() {

    this.plugins = new Plugins(this);
    this.server = express();
    this.server.use(express.json());
  }

  async start() {
    //load all plugins
    await this.plugins.loadFromConfig();
    
    // Logging
    this.server.use(morgan('dev'));

    // Start the Proxy
    this.server.listen(PORT, HOST, () => {
        console.log(`Starting Proxy at ${HOST}:${PORT}`);
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

