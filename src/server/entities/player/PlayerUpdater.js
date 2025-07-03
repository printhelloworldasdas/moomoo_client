import { gameProtocol } from "../../const.js"
import Player from "./Player.js"

export default class PlayerUpdater {
    constructor(targetPlayer) {
        this.targetPlayer = targetPlayer

        this.visibilityPlayers = new Map()
    }

    getVisibilityPlayers() {
        return this.visibilityPlayers
    }

    eachAllWhoSeeMe(callback) {
        Player.playingPlayersIds.forEach((sid) => {
            const player = Player.getPlayerBySid(sid)

            if (player.checkCanSee(this.targetPlayer)) callback(player)
        })
    }

    updateVisibilityPlayers() {
        const playersUpdateData = []

        Player.playingPlayersIds.forEach((sid) => {
            const player = Player.getPlayerBySid(sid)

            if (this.targetPlayer.checkCanSee(player)) {
                if (!playersUpdateData.length) {
                    playersUpdateData.push(player.getUpdateData().array.length)
                }

                playersUpdateData.push(player.getUpdateData().array)
            }

            if (this.visibilityPlayers.has(sid)) {
                if (this.targetPlayer.checkCanSee(player)) return

                this.visibilityPlayers.delete(sid)

                return this.targetPlayer.getLinkedSocket().sender.emit(gameProtocol.SERVER.REMOVE_PLAYER, player.getRemoveData().object)
            }

            this.visibilityPlayers.set(sid, {
                sid: sid,
                getPlayer() {
                    return Player.getPlayerBySid(this.sid)
                }
            })

            if (this.targetPlayer.sid === sid) return

            this.targetPlayer.getLinkedSocket().sender.emit(gameProtocol.SERVER.ADD_PLAYER, player.getAddData().object)
        })

        if (!playersUpdateData.length) return

        this.targetPlayer.getLinkedSocket().sender.emit(gameProtocol.SERVER.UPDATE_PLAYERS, { playersData: playersUpdateData.flat(1) })
    }

    update() {        
        this.updateVisibilityPlayers()
    }
}