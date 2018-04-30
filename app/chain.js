let block = require("./block"),
util      = require("util");

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

    get last() {
        return this.blocks[ this.blocks.length - 1 ];
    }

    get valid() {
        return this.verify();
    }

    verify() {

        for(let i=this.blocks.length-1;i>0;i--) {

            let b = this.blocks[i];

            if( b.prevHash != this.blocks[i-1].hash || !b.verify())
                return 0;
        }

        return 1;
    }

    addBlockClass(block) {
        this.blocks.push(block);
    }

    addBlock(data,nonce=null,mine=true) {

        let last = this.last , prevHash = last.hash , id = last.id;

        let bl = new block(id+1,data,prevHash,nonce);

        if(mine)
            bl.mine();

        this.blocks.push(bl);

        console.log(bl);
        return bl;
    }

    export() {
        let blocks = [];

        for(let i in this.blocks)
            blocks[i] = this.blocks[i].export();

        return blocks;

        return {
            blocks : blocks,
            valid  : this.valid
        };
    }

    toJSON() {
        return this.export();
    }

    [util.inspect.custom]() {
        return this.export();
    }
};

module.exports = BlockChain;
