let crypto = require("crypto"),
startingZeros = "000";

class Block {

    constructor(id,data,prevHash,nonce) {
        this.id       = parseInt(id);
        this.nonce    = nonce;
        this.data     = data;
        this.prevHash = prevHash;
        
    }

    get hash() {
        return (this._hash = crypto.createHash("sha256").update( JSON.stringify([this.id,this.data,this.prevHash,this.nonce]) ).digest("hex"));
    }

    get valid() {
        return this.verify();
    }

    verify() {

        return this.hash.indexOf(startingZeros) === 0;
    }

    mine(cb=null) {

        if(this.verify())
            return cb ? cb(this) : this;
        
        this.nonce = 0;

        while(!this.verify()) {
            this.nonce++;
        }

        return cb ? cb(this) : this;

    }

    asyncMine() {
        let t = this;

        return new Promise( (resolve) => {
            t.mine(resolve);
        });
    }

    copy() {
        return new Block(this.id,this.data,this.prevHash,this.nonce);
    }

    export() {
        return {
            id       : this.id,
            hash     : this.hash,
            data     : this.data,
            nonce    : this.nonce,
            prevHash : this.prevHash,
            valid    : this.valid,
        };
    }

    toJSON() {
        return this.export();
    }
}

module.exports = Block;