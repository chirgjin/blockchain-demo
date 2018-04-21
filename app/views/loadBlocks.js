
function loadBlocks(req,res) {
    console.log(this);
    res.send(this.ip);
}

module.exports = loadBlocks;