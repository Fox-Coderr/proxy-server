//Blacklist and whitelist plugin

const fs = require('fs');

//get both lists from list.json
const list = JSON.parse(fs.readFileSync('./plugins/list.json'));
const blacklist = list['blacklist']
const whitelist = list['whitelist']

function load(app) {
  app.server.use((req, res, next) => { 

    //check if the url is in the blacklist or not in the whitelist and if so, send a 403
    //if the whitelist is empty it only uses the blacklist to validate.
    if (blacklist.includes(req.url.split('/')[1])){
      res.sendStatus(403);
    }else if(whitelist.length != 0 && !(whitelist.includes(req.url.split('/')[1]))){
      res.sendStatus(403);
    }
    next()
  });

}
//nothing to do on unload
function unload(app) {  
}

module.exports = {
  load,
  unload
};