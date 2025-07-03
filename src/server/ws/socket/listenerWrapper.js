import msgpack from "msgpack-lite"
import Socket from "./Socket.js"
import getMessageSchema from "./getMessageSchema.js"
import { gameConfig, gameProtocol } from "../../const.js"
import messageSchemaChecker from "./messageSchemaChecker.js"

function toArrayBuffer(buffer) {
    const arrayBuffer = new ArrayBuffer(buffer.length)
    const view = new Uint8Array(arrayBuffer)

    for (let i = 0; i < buffer.length; ++i) {
        view[i] = buffer[i]
    }

    return arrayBuffer
}

export default function(socket) {
    if (!(socket instanceof Socket)) return false

    socket.websocket.on("close", (event) => {
        socket.listener.emit("disconnected", event)
    })

    socket.websocket.on("message", (message) => {
        try {
            message = toArrayBuffer(message)

            const binary = new Uint8Array(message)
            const decoded = msgpack.decode(binary)
            const schema = getMessageSchema(decoded)
    
            socket.listener.emit("message", schema)
            socket.listener.emit(schema.packetId, schema, decoded)
        } catch (errorText) {
            console.log(errorText)
        }
    })

    socket.listener.on(gameProtocol.CLIENT.TEST_PACKET, (schema) => {})

    socket.listener.on(gameProtocol.CLIENT.ENTER_GAME, (schema) => {
        if (!messageSchemaChecker(schema)) return socket.close()

        socket.createPlayer(schema.nickname, schema.skinColorIndex)
    })

    socket.listener.on(gameProtocol.CLIENT.UPDATE_WATCH_ANGLE, (schema) => {
        if (!messageSchemaChecker(schema)) return socket.close()

        socket.getLinkedPlayer().setWatchAngle(schema.watchAngle)
    })

    socket.listener.on(gameProtocol.CLIENT.UPDATE_MOVE_ANGLE, (schema) => {
        if (!messageSchemaChecker(schema)) return socket.close()

        socket.getLinkedPlayer().setMoveAngle(schema.moveAngle)
    })
}