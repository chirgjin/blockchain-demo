let Block = require("./app/block"),
Chain = require("./app/chain"),
test = (code) => {
    let d = new Date().getTime();;


    code();

    let d2 = new Date().getTime();

    console.log("Test Completed in %d Secs", (d2-d)/1000);
};


test( () => {

    let mychain = new Chain();

    mychain.addBlock({name : "Chirag Jain",money:9999,position:"Admin"});
    mychain.addBlock({name : "Chirag Jain",money:9999,position:"Admin"});
    mychain.addBlock({name : "Chirag Jain",money:9999,position:"Admin"});

    console.log(mychain.blocks);
    console.log(mychain.verify());

    mychain.blocks[1].data.money--;

    console.log(mychain.verify());
    
    console.log(mychain.blocks[1].verify());
    console.log(mychain.blocks[2].verify());
    console.log(mychain.blocks[3].verify());

});