import { gameProtocol } from "../../const.js"
import Socket from "./Socket.js"

export default function(socket) {
    if (!(socket instanceof Socket)) return false

    socket.sender.on(gameProtocol.SERVER.CREATE_LOCAL_PLAYER, ({ sid, nickname, skinColorIndex, x, y, watchAngle }) => {        
        if (!socket.getLinkedPlayer().needsSendCreationLocalPlayer) return

        socket._sendMessage(gameProtocol.SERVER.CREATE_LOCAL_PLAYER, sid, nickname, skinColorIndex, x, y, watchAngle)

        socket.getLinkedPlayer().needsSendCreationLocalPlayer = false
    })

    socket.sender.on(gameProtocol.SERVER.ADD_PLAYER, ({ sid, nickname, skinColorIndex, x, y, watchAngle, health }) => {
        socket._sendMessage(gameProtocol.SERVER.ADD_PLAYER, sid, nickname, skinColorIndex, x, y, watchAngle, health)
    })

    socket.sender.on(gameProtocol.SERVER.REMOVE_PLAYER, ({ sid }) => {
        socket._sendMessage(gameProtocol.SERVER.REMOVE_PLAYER, sid)
    })

    socket.sender.on(gameProtocol.SERVER.UPDATE_PLAYERS, ({ playersData }) => {        
        socket._sendMessage(gameProtocol.SERVER.UPDATE_PLAYERS, playersData)
    })
}