The idea behind this project is to create a proxy that receives and serves requests and responses to plugins who will manipulate them. The plugins are executed when a new request/response is made so they can alter/validade them. Only after all plugins have executed will the proxy proceed to the next part.
 
### Table of Contents
 * [Requirements](#Requirements)
 * [Considerations](#Considerations)
 * [How it works](#How-it-works)
 * [Currently plugins](#Currently-plugins)
 
### Requirements
* Node v10.19.0
 
### Considerations
 
* All plugins will work, so there is no need to validate them.
* Plugins can alter requests and/or responses
 
### Plugins requirements
See plugins/example.js 
 
### How to add plugins
 
1) Place the js plugin inside the plugins folder
2) Add the plugin name and location to the correct request or response Json
3) Restart the project
 
### Currently plugins
 
* Authorization: Check request credentials
 
* Whitelist/Blacklist: Check if the requested URL is in the whitelist and isn't in the blacklist
 
* Masking: Replaces the request Host
