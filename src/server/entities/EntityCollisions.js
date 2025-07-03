import { gameConfig } from "../const.js"
import Player from "./player/Player.js"

export default class EntityCollisions {
    constructor(targetEntity, { gameMap, players }) {
        this.targetEntity = targetEntity
        this.isCheckGameMapCollision = gameMap
        this.isCheckPlayersCollision = players
    }

    getTargetPlayer() {
        return Player.getPlayerBySid(this.targetEntity.eid)
    }

    onGameMapCollision() {}

    onPlayersCollision() {}

    checkGameMapCollision() {
        const sides = [ false, 0, 0, 0, 0 ]
        
        const setCollide = (side) => (sides[0] = true, sides[side + 1] = true)

        if ((this.targetEntity.x - this.targetEntity.getScale()) < 0) {
            setCollide(0)
        } else if ((this.targetEntity.x + this.targetEntity.getScale()) > gameConfig.gameMap.metrics.width) {
            setCollide(1)
        }

        if ((this.targetEntity.y - this.targetEntity.getScale()) < 0) {
            setCollide(2)
        } else if ((this.targetEntity.y + this.targetEntity.getScale()) > gameConfig.gameMap.metrics.height) {
            setCollide(3)
        }

        const _this = this

        if (sides[0]) {
            const [ _, left, right, up, down ] = sides

            if (left) _this.targetEntity.x = _this.targetEntity.getScale()
            if (right) _this.targetEntity.x = gameConfig.gameMap.metrics.width - _this.targetEntity.getScale()
            if (up) _this.targetEntity.y = _this.targetEntity.getScale()
            if (down) _this.targetEntity.y = gameConfig.gameMap.metrics.height - _this.targetEntity.getScale()

            this.onGameMapCollision(sides)

            return true
        }

        return false
    }

    checkPlayersCollision() {
        const targetPlayer = this.getTargetPlayer()

        if (targetPlayer) {
            if (!targetPlayer.isPlayer) return

            const visibilityPlayers = targetPlayer.getVisibilityPlayers()

            visibilityPlayers.forEach((visibilityPlayer) => {
                visibilityPlayer = visibilityPlayer.getPlayer()

                if (!visibilityPlayer) return
                if (targetPlayer.checkIsMe(visibilityPlayer)) return

                const collision = this.checkCircleCollision(targetPlayer, visibilityPlayer)

                if (collision) {
                    collision.collide()
                    this.onPlayersCollision(visibilityPlayer)
                }
            })
        }

        return false
    }

    checkCircleCollision(entity1, entity2) {
        const difX = entity1.x - entity2.x
        const difY = entity1.y - entity2.y
        const totalLength = entity1.getScale() + entity2.getScale()
        
        if (Math.abs(difX) > totalLength && Math.abs(difY) > totalLength) return false

        let magnitude = Math.sqrt(difX * difX + difY * difY) - totalLength

        if (magnitude > 0) return false

        const angle = entity2.angleTo(entity1)

        magnitude = (magnitude * -1) / 2

        return {
            collide() {
                entity1.x += magnitude * Math.cos(angle)
                entity1.y += magnitude * Math.sin(angle)
                entity2.x -= magnitude * Math.cos(angle)
                entity2.y -= magnitude * Math.sin(angle)
            }
        }
    }

    update() {
        if (this.isCheckGameMapCollision) this.checkGameMapCollision()
        if (this.isCheckPlayersCollision) this.checkPlayersCollision()
    }
}