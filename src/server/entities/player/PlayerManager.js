import { gameConfig, wsServer } from "../../const.js"
import Socket from "../../ws/socket/Socket.js"
import Entity from "../Entity.js"

export default class PlayerManager extends Entity {
    constructor({ sid, nickname, skinColorIndex }) {
        super({
            eid: sid,
            x: 0,
            y: 0,
            scale: gameConfig.entities.player.metrics.scale,
            health: gameConfig.entities.player.stats.spawnHealth,
            maxHealth: gameConfig.entities.player.stats.maxHealth,
            collisionTypes: {
                gameMap: true,
                players: true
            }
        })

        this.sid = sid
        this.nickname = nickname
        this.skinColorIndex = skinColorIndex

        this.age = gameConfig.entities.player.stats.spawnAge

        this.defaultMoveSpeed = gameConfig.entities.player.movement.speed
        this.defaultMoveDecel = gameConfig.entities.player.movement.decel

        this.isPlaying = false

        this.linkedSocket = undefined
    }

    getUpdateData() {
        const updateData = {
            sid: this.sid,
            x: this.x,
            y: this.y,
            watchAngle: this.getWatchAngle()
        }

        return {
            object: updateData,
            array: Object.values(updateData)
        }
    }

    getAddData() {
        const addData = {
            sid: this.sid,
            nickname: this.getNickname(),
            skinColorIndex: this.getSkinColorIndex(),
            x: this.x,
            y: this.y,
            watchAngle: this.getWatchAngle(),
            health: this.getHealth()
        }

        return {
            object: addData,
            array: Object.values(addData)
        }
    }

    getRemoveData() {
        const removeData = {
            sid: this.sid
        }

        return {
            object: removeData,
            array: Object.values(removeData)
        }
    }

    getLinkedSocket() {
        if (typeof this.linkedSocket === 'undefined') {
            const linkedSocket = wsServer.get(this.sid)

            this.setLinkedSocket(linkedSocket)

            return linkedSocket
        }

        return this.linkedSocket
    }

    getNickname() {
        return this.nickname
    }

    getSkinColorIndex() {
        return this.skinColorIndex
    }

    getAge() {
        const { spawnAge, maxAge } = gameConfig.entities.player.stats

        return Math.max(spawnAge, Math.min(maxAge, this.age))
    }

    getMovementSpeed() {
        return this.defaultMoveSpeed
    }

    getMovementDecel() {
        return this.defaultMoveDecel
    }
    
    setLinkedSocket(linkedSocket) {
        if (!(linkedSocket instanceof Socket)) return

        this.linkedSocket = linkedSocket
    }

    setRandomCoordinates() {
        const x = Math.randomInt(0, gameConfig.gameMap.metrics.width)
        const y = Math.randomInt(0, gameConfig.gameMap.metrics.height)

        this.setTo(x, y)
    }

    setNickname(nickname) {
        this.nickname = nickname
    }

    setSkinColorIndex(skinColorIndex) {
        this.skinColorIndex = skinColorIndex
    }

    setAge(age) {
        const { spawnAge, maxAge } = gameConfig.entities.player.stats

        this.age = Math.max(spawnAge, Math.min(maxAge, age))
    }

    setMoveAngle(moveAngle) {
        this.movement.setMoveAngle(moveAngle)
    }

    checkIsMe(player) {
        return Boolean(this.sid === player.sid)
    }

    entityStatsToDefault() {
        this.setWatchAngle(Math.randomAngle())
        this.setHealth(this.getMaxHealth())
    }
}