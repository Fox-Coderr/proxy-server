// Plugin that masks both the origin and the destination

const load = async (req, res) => {
    //masking the origin
    //check and remove host from header
    if(req.headers.host){
        delete req.headers.host
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