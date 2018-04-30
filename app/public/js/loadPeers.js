function loadPeers() {

    $.getJSON("/peers",(resp) => {
        
        console.log(resp);

    }).error( e => {
        alert("Error - Server Down");
    })
}