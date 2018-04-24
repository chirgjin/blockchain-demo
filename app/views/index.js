let requireDirectory = require("require-directory");

function registerViews() {

    let app = this.app;

    this.views = requireDirectory( module );

    app.post("/create"      , this.views.createBlock.bind(this));
    app.get("/load/:peer_id", this.views.loadBlocks.bind(this));
    app.get("/peers"        , this.views.loadPeers.bind(this));

    this.log("--- Registered All the views ---");
}

module.exports = registerViews;