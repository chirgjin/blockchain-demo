function _loadMyBlockChain(peer_id) {

    return new Promise((resolve,reject) => {
        $.getJSON(`/load/${peer_id}`,(resp) => {

            resolve(resp);

        }).error(reject);

    });
}

function loadMyBlockChain() {

    let peer_id = $("#peer_id").val();

    _loadMyBlockChain(peer_id).then((resp) => {
        
        console.log(resp);

    });
}

