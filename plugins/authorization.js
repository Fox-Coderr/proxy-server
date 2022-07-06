//Plugin to validate autorization header

const load = async (req, res) => {
        //just check if there is an authorization header        
        if (req.headers.authorization) {
            //remove proxy autorization from the client header before sending the request
            delete req.headers.authorization
        } else {
            res.sendStatus(403);
            throw "403";
        }
        return true
    };

//nothing to do on unload
const unload = async (req, res) => {
  
}

module.exports = {
load,
unload
};