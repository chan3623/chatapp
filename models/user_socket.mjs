import db from '../config/db.mjs';

class UserSocketModel{
    constructor(id){
        this.id = id;
    }
    userDataCheck(userName, callback){
        const sql = `SELECT * FROM user_tb WHERE name = "${userName}"`;
        db.query(sql, callback);
    }
    userDataSave(userData, callback){
        const {name, token, online} = userData;
        const sql = `INSERT INTO user_tb VALUES(null, "${name}", "${token}", ${online})`;
        db.query(sql, callback);
    }
    userConnectionInfoUpdate(connectionInfo, callback){
        const {name, token, online} = connectionInfo;
        const sql = `UPDATE user_tb SET token = "${token}", online = ${online} WHERE name = "${name}"`;
        db.query(sql, callback);
    }
    tokenDataCheck(id, callback){
        const sql = `SELECT * FROM user_tb WHERE token = "${id}"`;
        db.query(sql, callback);
    }
}
const userSocketModel = new UserSocketModel("userSocket");

export default userSocketModel;