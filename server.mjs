import service from './middle/middle.mjs';
import serverListener from './daemon/listener.mjs';
import socket from './socket/socket.mjs';
import ioSetting from './utils/io.mjs';

class Chatting{
    constructor(id, service, serverListener, socket, ioSetting){
        this.id = id;
        this.service = service;
        this.serverListener = serverListener;
        this.socket = socket;
        this.ioSetting = ioSetting;
    }
    router(){

    }
    listener(){
        this.serverListener.serverStart(this.service);
    }
    async socketStart(){
        await this.ioSetting.run();
    }
    run(){
        this.listener();
        this.socketStart();
    }
}

const chatting = new Chatting("chatting", service, serverListener, socket, ioSetting);
chatting.run();