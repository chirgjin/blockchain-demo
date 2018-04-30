
function createBlock() {

    let nonce = parseInt($("#nonce").val()) , data = JSON.parse($("#json").val()) , peer_id = $("#peer_id").data("val");

    let formData = {
        jsonData : JSON.stringify({data:data,nonce:nonce}),
        peer_id  : peer_id
    };

    $.post("/create",formData,function (resp) {

        alert("Created New Block");
        console.log(resp);

    }).error( (e) => {
        alert("Error - Server Down");
    });
    
}