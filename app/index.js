let 
fs         = require("fs"),
crypto     = require("crypto"),
path       = require("path"),
http       = require("http"),
express    = require("express"),
bodyParser = require("body-parser"),
addViews   = require("./views"),
BlockChain = require("./chain");

class blockChainApp {
    constructor(port = 70, ip = "0.0.0.0") {
        this.peers = {
            root : new BlockChain("root"),
        };

        this.port  = port;
        this.ip    = ip;

        this.logLevel = 0;

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

        console.log.apply(this,args);
    }

    createExpressApp() {
        //createApp.call(this);

        this.log("--- Creating ExpressJs App ---");
        this.logLevel++;

        this.app = express();

        this.app.use( bodyParser.urlencoded({ extended: false }) ); //use bodyparser to handle post requests

        this.app.use("/" , express.static( __dirname + "/public")); //Serve public directory

        addViews.call(this);

        this.logLevel--;
        this.log("--- Created ExpressJs App ---\n");
    }

    getPeer(id) {

        if(!this.peers[id]) {
            this.peers[id] = new BlockChain(id);
        }
            
        
        return this.peers[id];
    }
};

let app = new blockChainApp();
