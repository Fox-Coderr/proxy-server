//Load or unload all the plugins that are in plugins.json

const fs = require("fs");

const pluginsReq = JSON.parse(fs.readFileSync('./plugins/plugins_req.json'));
const pluginsRes = JSON.parse(fs.readFileSync('./plugins/plugins_res.json'));

class Plugins {
  constructor(app) {
    this.app = app;
    this.plugins = {};
  }

  //load the plugins list that need to be loaded
  async loadFromRequestConfig(req, res) {    
    return Object.keys(pluginsReq).map( async (plugin) =>{
      return this.load(req, res,plugin,pluginsReq[plugin])
        .catch(function(){
          throw "403";
      })
    })
  }

  async loadFromResponseConfig(req, res) {    
    return Object.keys(pluginsRes).map( async (plugin) =>{
      return this.load(req, res,plugin,pluginsRes[plugin])
        .catch(function(){
          throw "403";
      })
    })
  }

  //Main load function
  async load(req, res,plugin,path) {
    try {
      const module = require(path);
      this.plugins[plugin] = module;
      return this.plugins[plugin].load(req, res);
    } catch (e) {
      console.log(`Failed to load '${plugin}'`,e)
      res.sendStatus(403);
      throw "403";
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