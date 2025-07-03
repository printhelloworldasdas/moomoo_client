import { socket } from "../../const.js"
import PlayerDrawing from "./PlayerDrawing.js"
import EntityESP from "../EntityESP.js"
import PlayerManager from "./PlayerManager.js"

export default class Player extends PlayerManager {
    static players = new Map()
    static localPlayer = undefined
    
    constructor({ sid, nickname, skinColorIndex, x, y, health, watchAngle }) {
        super({ sid, nickname, skinColorIndex, x, y, health, watchAngle })

        this.drawing = new PlayerDrawing(this)
        this.esp = new EntityESP(this, { nickname: true })
    }

    isLocalPlayer() {
        return Player.getLocalPlayer().sid === this.sid
    }

    draw() {
        // this.drawing.drawWeapon()
        this.drawing.drawHands()
        this.drawing.drawBody()
        // this.drawing.drawAccessory()
        // this.drawing.drawHat()
    }

    updateESP() {
        this.esp.update()
    }

    update() {
        this.draw()
    }

    static getPlayerBySid(sid) {
        if (!Player.players.has(sid)) return

        return Player.players.get(sid)
    }

    static getLocalPlayer() {
        if (typeof socket.getSocketId() === 'undefined') return
        if (Player.localPlayer instanceof Player) return Player.localPlayer
        if (!Player.players.has(socket.getSocketId())) return

        const localPlayer = Player.getPlayerBySid(socket.getSocketId())

        Player.setLocalPlayer(localPlayer)

        return localPlayer
    }

    static setLocalPlayer(localPlayer) {
        if (Player.localPlayer instanceof Player) return Player.localPlayer

        Player.localPlayer = localPlayer

        Player.players.set(localPlayer.sid, localPlayer)
    }

    static addPlayer(player) {
        if (!(player instanceof Player)) return

        const sid = Number(player.sid)

        Player.players.set(sid, player)
        player.setActive(true)
    }
    
    static removePlayer(player) {
        if (!(player instanceof Player)) return

        const sid = Number(player.sid)

        player.setActive(false)
        Player.players.delete(sid)
    }

    static eachPlayers(callback) {
        Player.players.forEach(callback)
    }

    static updatePlayersESP() {
        Player.eachPlayers((player) => {
            player.updateESP()
        })
    }

    static updatePlayers() {
        Player.eachPlayers((player) => {
            player.interpolatePosition()
            player.update()
        })
    }
}