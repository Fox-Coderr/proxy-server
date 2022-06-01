//Load or unload all the plugins that are in plugins.json

const fs = require("fs");

class Plugins {
  constructor(app) {
    this.app = app;
    this.plugins = {};
  }

  //load the plugins list that need to be loaded
  async loadFromConfig(path='./plugins/plugins.json') {
    const plugins = JSON.parse(fs.readFileSync(path));
    console.log(plugins)
    for (let plugin in plugins) {
      if (plugins[plugin]) {
        this.load(plugin,plugins[plugin]);
      }
    }
  }

  //Main load function
  async load(plugin,path) {
    try {
      const module = require(path);
      this.plugins[plugin] = module;
      await this.plugins[plugin].load(this.app);
      console.log(`Loaded plugin: '${plugin}'`);
    } catch (e) {
      console.log(`Failed to load '${plugin}'`)
      this.app.stop();
    }
  }

  //Main unload function
  unload(plugin) {
    if (this.plugins[plugin]) {
      this.plugins[plugin].unload();
      delete this.plugins[plugin];
      console.log(`Unloaded plugin: '${plugin}'`);
    }
  }

  //Stop all plugins
  stop() {
    for (let plugin in this.plugins) {
      this.unload(plugin);
    }
  }
}

module.exports = Plugins;