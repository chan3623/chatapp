import server from '../config/serverInfo.mjs';

class Listener{
    constructor(id, server){
        this.id = id;
        this.server = server;
    }
    serverStart(app){
        app.listen(this.server.port, () => {
            console.log(`Server Starting ${this.server.port}PORT`);
        });
    }
}

const listener = new Listener("serverListen", server);

export default listener