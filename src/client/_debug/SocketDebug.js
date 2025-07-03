import utils from "../../utils/index.js"
import gameConfig from "../../config.json"

export default class SocketDebug extends utils.Emitter {
    static prefix = "🌐"

    constructor() {
        super()

        this.isConnected = false
        this.isClosed = false

        const socketDebug = gameConfig._debug.debugs.socket

        if (!gameConfig._debug._active || !socketDebug.debugging) return this

        socketDebug.connecting && this.on("connecting", this.onConnecting.bind(this))
        socketDebug.connected && this.on("connected", this.onConnected.bind(this))
        socketDebug.disconnected && this.on("disconnected", this.onDisconnected.bind(this))
        socketDebug.receivePacket && this.on("receive-packet", this.onReceivePacket.bind(this))
        socketDebug.sendPacket && this.on("send-packet", this.onSendPacket.bind(this))
    }

    onConnecting() {
        this.log(`Started connecting to the server`)
    }

    onConnected() {
        this.log("Connected to the server")

        this.isConnected = true
        this.isClosed = false
    }

    onDisconnected(closeCode) {
        this.log(`The server closed the connection with code "${closeCode}"`)

        this.isConnected = false
        this.isClosed = true
    }

    onReceivePacket(packetSchema) {
        this.log("Receive >", packetSchema)
    }

    onSendPacket(type, data) {
        this.log("Send >", type, data)
    }

    log(text, ...data) {
        console.log(`${SocketDebug.prefix} | ${text}`, ...data)
    }
}