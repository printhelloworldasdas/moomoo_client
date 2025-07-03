import utils from "../../../utils/index.js"
import msgpack from "msgpack-lite"
import senderWrapper from "./senderWrapper.js"
import listenerWrapper from "./listenerWrapper.js"
import { wsServer } from "../../const.js"
import Player from "../../entities/player/Player.js"

export default class Socket {
    constructor({ ws, sid }) {
        this.websocket = ws
        this.sid = sid

        this.sender = new utils.Emitter()
        this.listener = new utils.Emitter()

        this.linkedPlayer = undefined

        this.isConnected = false

        this._setup()
    }

    getLinkedPlayer() {
        return this.linkedPlayer
    }

    setLinkedPlayer(linkedPlayer) {
        if (!(linkedPlayer instanceof Player)) return undefined

        this.linkedPlayer = linkedPlayer
    }

    _sendMessage(type, ...data) {
        const binary = msgpack.encode([ type, data ])

        this.websocket.send(binary)
    }

    createPlayer(nickname, skinColorIndex) {
        if (typeof this.getLinkedPlayer() === 'undefined') {
            const player = new Player({
                sid: this.sid,
                nickname, skinColorIndex
            })

            this.setLinkedPlayer(player)
            this.getLinkedPlayer().spawn()

            return
        }
        
        this.getLinkedPlayer().setNickname(nickname)
        this.getLinkedPlayer().setSkinColorIndex(skinColorIndex)
        this.getLinkedPlayer().spawn()
    }

    close() {
        this.websocket.close && this.websocket.close()
    }

    onDisconnected() {
        if (!this.isConnected) return
        
        wsServer.sidToFree(this.sid)

        if (Player.existPlayersIds.has(this.sid)) {
            Player.removePlayer(this.getLinkedPlayer())
        }

        this.isConnected = false
    }

    _setup() {
        this.isConnected = true

        senderWrapper(this)
        listenerWrapper(this)

        this.listener.on("disconnected", this.onDisconnected.bind(this))
    }
}