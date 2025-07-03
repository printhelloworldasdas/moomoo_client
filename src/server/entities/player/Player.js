import { gameProtocol } from "../../const.js"
import PlayerManager from "./PlayerManager.js"
import PlayerUpdater from "./PlayerUpdater.js"

export default class Player extends PlayerManager {
    static players = new Map()
    static existPlayersIds = new Map()
    static playingPlayersIds = new Map()

    constructor({ sid, nickname, skinColorIndex }) {
        super({ sid, nickname, skinColorIndex })

        this.updater = new PlayerUpdater(this)

        this.needsSendCreationLocalPlayer = false

        this.isPlayer = true

        Player.addPlayer(this)
    }

    getVisibilityPlayers() {
        return this.updater.getVisibilityPlayers()
    }

    spawn() {
        if (this.isPlaying) return

        this.entityStatsToDefault()
        this.setRandomCoordinates()

        this.needsSendCreationLocalPlayer = true
        
        this.getLinkedSocket().sender.emit(gameProtocol.SERVER.CREATE_LOCAL_PLAYER, {
            sid: this.sid,
            nickname: this.getNickname(),
            skinColorIndex: this.getSkinColorIndex(),
            x: this.x,
            y: this.y,
            watchAngle: this.getWatchAngle()
        })

        this.isPlaying = true

        Player.playingPlayersIds.set(this.sid, this.sid)
    }

    kill() {
        if (!this.isPlaying) return

        this.setHealth(0)

        this.isPlaying = false

        Player.playingPlayersIds.delete(this.sid)
    }

    update() {
        this.movement.update()
        this.updater.update()
    }

    static getPlayerBySid(sid) {
        if (!Player.existPlayersIds.has(sid)) return

        return Player.players.get(sid)
    }

    static getPlayerSocketBySid(sid) {
        if (!Player.existPlayersIds.has(sid)) return

        const player = Player.getPlayerBySid(sid)

        if (!player) return

        return player.getLinkedSocket()
    }

    static addPlayer(player) {
        const sid = Number(player.sid)

        Player.existPlayersIds.set(sid, sid)
        Player.players.set(sid, player)
    }

    static removePlayer(player) {
        const sid = Number(player.sid)

        player.kill()

        player.updater.eachAllWhoSeeMe((seesMePlayer) => {
            seesMePlayer.getLinkedSocket().sender.emit(gameProtocol.SERVER.REMOVE_PLAYER, player.getRemoveData().object)
        })

        Player.existPlayersIds.delete(sid)
        Player.playingPlayersIds.delete(sid)
        Player.players.delete(sid)
    }

    static eachPlayers(callback) {
        for (const player of Player.players) callback(player)
    }

    static updatePlayers() {
        Player.existPlayersIds.forEach((sid) => {
            const player = Player.getPlayerBySid(sid)

            if (!player) return

            player.update()
        })
    }
}