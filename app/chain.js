let block = require("./block");

class BlockChain {

    constructor (id,copy=0) {
        this.blocks = [];
        this.id     = id;
        
        if(!copy) {
            let b = new block(1,null,"00000000000000",17862945);

            b.mine();

            this.blocks.push( b );
        }
        else {
            for(let i=0;i<copy.length;i++)
                this.blocks.push(copy[i].copy());
        }
    }

    getLast() {
        return this.blocks[ this.blocks.length - 1 ];
    }

    verify() {

        for(let i=this.blocks.length-1;i>0;i--) {

            let b = this.blocks[i];

            if( b.prevHash != this.blocks[i-1].hash || !b.verify())
                return 0;
        }

        return 1;
    }

    addBlock(data,mine=true) {

        let last = this.getLast() , prevHash = last.hash , id = last.id;

        let bl = new block(id+1,data,prevHash,0);

        if(mine)
            bl.mine();

        this.blocks.push(bl);

        return bl;
    }

};

module.exports = BlockChain;