import chatSocketModel from '../models/chat_socket.mjs';

class ChatSocketController {
    constructor(id) {
        this.id = id;
    }
    chatMessageSave(message, user) {
        const timestamp = Date.now().toString(36);
        const randomNum = Math.random().toString(36).substring(2, 9);
        const _id = `${timestamp}-${randomNum}`;
        const resultObj = {}
        return new Promise((resolve, reject) => {
            chatSocketModel.chatDataSave(message, user, _id, (err, result) => {
                if (err) {
                    console.log("message data 저장 중 error : ", err);
                    return reject(err);
                } else {
                    chatSocketModel.chatDataLoad(message, user, _id, (err, result) => {
                        if (err) {
                            console.log("message data load 중 error : ")
                        } else if (result.length !== 0) {
                            console.log("chat data : ", result);
                            resultObj.id = result[0].id;
                            resultObj.chat = result[0].chat;
                            resultObj.user_id = result[0].user_id;
                            resultObj.user_name = result[0].user_name;
                            resultObj._id = result[0]._id;
                            resultObj.create_at = result[0].create_at;
                            resultObj.updated_at = result[0].updated_at;
                            return resolve(resultObj);
                        } else if (result.length === 0) {
                            console.log("chat data not found");
                            return reject(false);
                        }
                    });
                }
            });
        });
    }
}

const chatSocketController = new ChatSocketController("chatSocketController");
export default chatSocketController;
