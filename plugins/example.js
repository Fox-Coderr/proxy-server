//Example plugin

//Load function with the plugin features
const load = async (req, res) => {
};

//unload function in case the plugins need to save before closing
const unload = async (req, res) => {
}

module.exports = {
load,
unload
};