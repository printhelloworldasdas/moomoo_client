import msgpack from "msgpack-lite"
import Socket from "./Socket.js"
import getMessageSchema from "./getMessageSchema.js"
import Debug from "../_debug/Debug.js"
import { gameConfig, gameProtocol, gui, ui } from "../const.js"
import Player from "../entities/player/Player.js"

export default function(socket) {
    if (!(socket instanceof Socket)) return false

    socket.websocket.addEventListener("open", (event) => {
        socket.listener.emit("connected", event)
        Debug.socket.emit("connected")
    })

    socket.websocket.addEventListener("close", (event) => {
        socket.listener.emit("disconnected", event)
        Debug.socket.emit("disconnected", event.code)
    })

    socket.websocket.addEventListener("message", (event) => {
        const binary = new Uint8Array(event.data)
        const decoded = msgpack.decode(binary)
        const schema = getMessageSchema(decoded)

        socket.listener.emit("message", schema, decoded)
        socket.listener.emit(schema.packetId, schema, decoded)
        Debug.socket.emit("receive-packet", schema)
    })

    socket.listener.on(gameProtocol.SERVER.CREATE_LOCAL_PLAYER, (schema) => {
        ui.mainMenu.hide()
        gui.gameUI.show()

        window.Player = Player

        if (Player.getLocalPlayer() instanceof Player) {
            Player.getLocalPlayer().setNickname(schema.nickname)
            Player.getLocalPlayer().setSkinColorIndex(schema.skinColorIndex)
            Player.getLocalPlayer().setTo(schema.x, schema.y)
            Player.getLocalPlayer().setHealth(gameConfig.entities.player.stats.maxHealth)
            Player.getLocalPlayer().setWatchAngle(schema.watchAngle)
            Player.getLocalPlayer().setActive(true)

            return
        }

        socket.setSocketId(schema.sid)
        Player.addPlayer(new Player({
            sid: schema.sid,
            nickname: schema.nickname,
            skinColorIndex: schema.skinColorIndex,
            x: schema.x,
            y: schema.y,
            health: gameConfig.entities.player.stats.maxHealth,
            watchAngle: schema.watchAngle
        }))
    })

    socket.listener.on(gameProtocol.SERVER.ADD_PLAYER, (schema) => {
        Player.addPlayer(new Player({
            sid: schema.sid,
            nickname: schema.nickname,
            skinColorIndex: schema.skinColorIndex,
            x: schema.x,
            y: schema.y,
            health: schema.health,
            watchAngle: schema.watchAngle
        }))

        console.log(schema)
    })

    socket.listener.on(gameProtocol.SERVER.REMOVE_PLAYER, (schema) => {
        Player.removePlayer(Player.getPlayerBySid(schema.sid))

        console.log(schema)
    })

    socket.listener.on(gameProtocol.SERVER.UPDATE_PLAYERS, (schema) => {
        const currentTime = Date.now()

        schema.playersData.forEach((playerData) => {
            const player = Player.getPlayerBySid(playerData.sid)

            player.updateTickRate = 0
            player.oldUpdateTickTime = (player.currentUpdateTickTime === null) ? currentTime : player.currentUpdateTickTime
            player.currentUpdateTickTime = currentTime

            player.oldTickPosition.set(player.x, player.y)
            player.tickPosition.set(playerData.x, playerData.y)

            player.setOldTickWatchAngle(player.getTickWatchAngle())
            player.setTickWatchAngle(playerData.watchAngle)
        })
    })
}