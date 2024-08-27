import db from '../config/db.mjs';

class ChatSocketModel{
    constructor(id){
        this.id = id;
    }
    chatDataSave(message, user, _id, callback){
        const {id, name} = user;
        const sql = `INSERT INTO chat_tb(id, chat, user_id, user_name, _id) VALUES(null, "${message}", ${id}, "${name}", "${_id}")`;
        db.query(sql, callback);
    }
    chatDataLoad(message, user, _id, callback){
        const {id, name} = user;
        const sql = `SELECT * FROM chat_tb WHERE user_id = ${id} AND user_name = "${name}" AND chat = "${message}" AND _id = "${_id}"`;
        db.query(sql, callback);
    }
}
const chatSocketModel = new ChatSocketModel("chatSocketModel");

export default chatSocketModel;