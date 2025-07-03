import { gameConfig } from "../const.js"
import Socket from "./socket/Socket.js"

export default class WSServer extends Map {
    constructor() {
        super()

        this.socketsIds = new Array(gameConfig.serverData.maxPlayers).fill(undefined)
    }

    getFreeSidsAmount() {
        return this.socketsIds.filter((socketId) => typeof socketId === 'undefined').length
    }

    getFreeSid() {
        let socketId = null

        if (!this.getFreeSidsAmount()) return null

        for (let i = 0; i < this.socketsIds.length; i++) {
            if (typeof this.socketsIds[i] === 'undefined') {
                socketId = i

                break
            }
        }

        return socketId
    }

    occupySid(index) {
        this.socketsIds[index] = index
    }

    sidToFree(index) {
        this.socketsIds[index] = undefined
    }

    createSocket(ws) {
        const sid = this.getFreeSid()

        if (sid === null) return ws.close()

        this.occupySid(sid)
        this.set(sid, new Socket({ ws, sid }))
    }
}