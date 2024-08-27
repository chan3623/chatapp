import dotenv from 'dotenv';
import db from '../config/db.mjs';
import {createServer} from 'http';
import {Server} from 'socket.io';
dotenv.config({path:'./config/.env'});


class Socket{
    constructor(id, createServer, Server, db){
        this.id = id;
        this.createServer = createServer;
        this.Server = Server;
        this.db = db;
        this.httpServer = null;
        this.io = null;
    }
    httpCreateServer(db){
        this.httpServer = this.createServer(db);
        this.io = new this.Server(this.httpServer, {
            cors : {
                origin : 'http://localhost:3000'
            }
        });
    }
    listener() {
        if (this.httpServer) {
            this.httpServer.listen(process.env.SOCKET_PORT, () => {
                console.log("Server listening on PORT", process.env.SOCKET_PORT);
            });
        } else {
            console.error("Error: HTTP server is not initialized.");
        }
    }
    start(){
        this.httpCreateServer(this.db);
        this.listener();
        return this.io;
    }
}

const socket = new Socket("socket", createServer, Server, db);


export default socket; 