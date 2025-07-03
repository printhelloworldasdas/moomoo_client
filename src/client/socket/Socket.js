import msgpack from "msgpack-lite"
import utils from "../../utils/index.js"
import listenerWrapper from "./listenerWrapper.js"
import senderWrapper from "./senderWrapper.js"
import { gui, ui } from "../const.js"
import Debug from "../_debug/Debug.js"

export default class Socket {
    static getConnectionUrl() {
        return `ws${location.protocol.slice(4).split(":")[0]}://${location.host}/new+connection`
    }

    constructor() {
        if (Socket._instance) return Socket._instance

        this.websocket = undefined
        
        this.sender = new utils.Emitter()
        this.listener = new utils.Emitter()

        this.socketId = undefined

        Socket._instance = this
    }

    getSocketId() {
        return this.socketId
    }

    setSocketId(socketId) {
        if (typeof socketId !== 'number') return
        
        this.socketId = socketId
    }

    checkReady() {
        return this.websocket?.readyState === WebSocket.OPEN
    }

    onDisconnected(event) {
        gui.gameUI.hide()
        ui.mainMenu.show()
        ui.cardsContainer.hide()
        ui.loadingText.toDisconnected().show()
    }

    _sendMessage(type, ...data) {
        if (!this.checkReady()) return

        const binary = msgpack.encode([ type, data ])

        this.websocket.send(binary)
        Debug.socket.emit("send-packet", type, typeof data[data.length - 1] === 'object' ? data[data.length - 1] : data)
    }

    connect() {
        return new Promise((resolve) => {
            this.websocket = new WebSocket(Socket.getConnectionUrl())
            this.websocket.binaryType = "arraybuffer"

            Debug.socket.emit("connecting")
            this._setup()
            
            this.listener.on("connected", resolve)
            this.listener.on("disconnected", this.onDisconnected.bind(this))
        })
    }

    _setup() {
        senderWrapper(this)
        listenerWrapper(this)
    }
}