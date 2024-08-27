import userSocketModel from '../models/user_socket.mjs';

class UserSocketController {
    constructor(id) {
        this.id = id;
    }

    userChatAppConnection(userName, id) {
        return new Promise((resolve, reject) => {
            userSocketModel.userDataCheck(userName, (err, result) => {
                if (err) {
                    console.log("유저 정보 조회 중 error : ", err);
                    return reject(err);
                } else if (result.length === 0) {
                    const userData = { name: userName, token: id, online: true };
                    userSocketModel.userDataSave(userData, (err, result) => {
                        if (err) {
                            console.log("유저 정보 저장 도중 error : ", err);
                            return reject(err);
                        } else {
                            console.log("유저 정보 저장 성공 : ", result);
                            resolve(userData);
                        }
                    });
                } else {
                    const connectionInfo = { name: userName, token: id, online: true };
                    userSocketModel.userConnectionInfoUpdate(connectionInfo, (err, result) => {
                        if (err) {
                            console.log("연결정보 업데이트 중 error : ", err);
                            return reject(err);
                        } else {
                            console.log("연결정보 업데이트 성공 : ", result);
                            resolve(connectionInfo);
                        }
                    });
                }
            });
        });
    }

    userFind(id){
        return new Promise((resolve, reject) => {
            let user = null;
            userSocketModel.tokenDataCheck(id, (err, result) => {
                if(err){
                    console.log("토큰을 통해 유저 탐색 중 error : ", err);
                    return reject(err);
                }else if(result.length !== 0){
                    user = result[0];
                    console.log("user : ", user);
                    return resolve(user);
                }else if(result.length === 0){
                    console.log("유저를 찾을 수 없습니다.");
                    return reject(false);
                }
            });
        });
    }
}

const userSocketController = new UserSocketController("userSocketController");
export default userSocketController;
