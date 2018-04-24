
function createBlock(req,res) {
    
    let data = req.body.data , nonce = parseInt(req.body.nonce) , peer = this.peer(req.body.peer_id);

    let block = peer.addBlock(data,nonce,false);

    return res.send({
        status    : "success",
        block     : block,
        peerChain : peer.export(),
        body : req.body
    });
}

module.exports = createBlock;