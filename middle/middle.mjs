import express from "express";
import cors from 'cors';

class MiddleWare{
    constructor(id, express){
        this.id = id;
        this.express = express;
    }
    setting(){
        const app = this.express();
        app.use(cors());
        app.use(express.json());
        app.use(express.urlencoded({extended : true}));
        
        return app;
    }
}

const middleWare = new MiddleWare("middleWare", express);
export default middleWare.setting();