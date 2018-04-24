function loadPeers(req,res) {

    res.send({
        status : "success",
        peers  : this.peerList()
    });
}
module.exports = loadPeers;