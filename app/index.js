let
fs         = require("fs"),
crypto     = require("crypto"),
path       = require("path"),
util       = require("util"),
http       = require("http"),
express    = require("express"),
bodyParser = require("body-parser"),
addViews   = require("./views"),
BlockChain = require("./chain");

process.env.NODE_DEBUG = "blockChainApp";

class blockChainApp {
    constructor(port = 70, ip = "0.0.0.0") {
        this.peers = {
            root : new BlockChain("root"),
        };

        this.port  = port;
        this.ip    = ip;

        this.logLevel = 0;
        this.debuglog = console.log || util.debuglog("blockChainApp");

        this.createExpressApp();
        this.startServer();
    }

    startServer() {

        this.server = http.createServer(this.app);

        this.server.listen(this.port,this.ip);

        this.log(`--- Server Listening to ${this.ip}:${this.port} ---`);
    }

    log() {

        let sp = '' , args = Array.prototype.slice.call(arguments,0);

        for(let i=0;i<this.logLevel;i++) {
            sp += "    ";
        }

        args.splice(0,0,sp);

        this.debuglog.apply(this,args);

        return this;
    }

    createExpressApp() {
        //createApp.call(this);

        this.log("--- Creating ExpressJs App ---");
        this.logLevel++;

        this.app = express();

        this.app.use( bodyParser.urlencoded({ extended: true }) ); //use bodyparser to handle post requests

        this.app.use("/" , express.static( __dirname + "/public")); //Serve public directory

        addViews.call(this);

        this.logLevel--;
        this.log("--- Created ExpressJs App ---\n");

        return this;
    }

    peer(id) {

        if(!this.peers[id]) {
            this.peers[id] = new BlockChain(id,this.peers.root);
        }

        return this.peers[id];
    }

    peerList() {

        let list = {} , _this = this;

        Object.keys(this.peers).forEach(key => {
            list[key] = _this.peer(key).export();
        });

        return list;
    }


    addBlockClass(block) {

        let _this = this , peers = this.peers;

        return new Promise((resolve,reject) => {

            Object.keys(peers).forEach( key => {
                let peer = peers[key];

                peer.addBlockClass(block);
            });

            return resolve(_this);
        });
    }

    addBlock(data,nonce=null,mine=false) {

        let _this = this , peers = this.peers;

        return new Promise( (resolve,reject) => {

            Object.keys(peers).forEach( key => {
                let peer = peers[key];

                peer.addBlock(data,mine);
            });

            return resolve(_this);
        });

    }

};

let app = new blockChainApp();
