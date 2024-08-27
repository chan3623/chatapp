import socket from '../socket/socket.mjs';
import userSocketController from '../controller/user.controller.mjs';
import chatSocketController from '../controller/chat.controller.mjs';

class IoSetting {
    constructor(id, socket) {
        this.id = id;
        this.socket = socket;
    }
    setting() {
        const io = this.socket.start();
        // 소캣 연결 할 경우
        io.on("connection", async (socket) => {
            console.log("client is connected", socket.id);
            // 로그인 시도
            socket.on("login", async (userName, callback) => {
                try {
                    const user = await userSocketController.userChatAppConnection(userName, socket.id);
                    const welcomeMessage = {
                        chat : `${user.name} is joined to this room`,
                        user_name : "system"
                    }
                    io.emit("message", welcomeMessage);
                    callback({ ok: true, data: user });
                } catch (err) {
                    callback({ ok: false, error: err.message });
                }
            });

            // 메세지 전송
            socket.on("sendMessage", async (message, callback) => {
                try {
                    const user = await userSocketController.userFind(socket.id);
                    const newMessage = await chatSocketController.chatMessageSave(message, user);
                    io.emit("message", newMessage);
                    callback({ ok: true, data: newMessage });
                } catch (err) {
                    callback({ ok: false, error: err.message });
                }
            });

            // 소캣 연결 후 연결을 끊을 경우
            socket.on("disconnect", () => {
                console.log("user is disconnected");
            });
        });
    }

    run() {
        this.setting();
    }
}

const ioSetting = new IoSetting("ioSetting", socket);
export default ioSetting;