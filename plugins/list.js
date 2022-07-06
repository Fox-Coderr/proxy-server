//Blacklist and whitelist plugin

const fs = require('fs');

//get both lists from list.json
const list = JSON.parse(fs.readFileSync('./plugins/list.json'));
const blacklist = list['blacklist']
const whitelist = list['whitelist']

const load = async (req, res) => {
    //check if the url is in the blacklist or not in the whitelist and if so, send a 403
    //if the whitelist is empty it only uses the blacklist to validate.
    if (blacklist.includes(req.url.split('/')[1])){
      res.sendStatus(403);
      throw "403";
    }else if(whitelist.length != 0 && !(whitelist.includes(req.url.split('/')[1]))){
      res.sendStatus(403);
      throw "403";
    }
    return true
  }
//nothing to do on unload
const unload = async (req, res) => {
  
}

module.exports = {
  load,
  unload
};