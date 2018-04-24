
function loadBlocks(req,res) {
    let peer = this.peer(req.params.peer_id);
    res.send({
        status    : "success",
        peerChain : peer.export()
    });
}

module.exports = loadBlocks;