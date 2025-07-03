import { gameConfig } from "../../const.js"
import Entity from "../Entity.js"

export default class PlayerManager extends Entity {
    constructor({ sid, nickname, skinColorIndex, x, y, health, watchAngle }) {
        super({
            x, y,
            scale: gameConfig.entities.player.metrics.scale,
            health: health,
            maxHealth: gameConfig.entities.player.stats.maxHealth,
            watchAngle
        })

        this.sid = sid
        this.nickname = nickname
        this.skinColorIndex = skinColorIndex

        this.active = false

        this.isPlayer = true
    }

    getNickname() {
        return this.nickname
    }

    getSkinColorIndex() {
        return this.skinColorIndex
    }

    getSkinColor() {
        const colors = gameConfig.entities.player.skin.colors

        return colors[[this.getSkinColorIndex()]] || colors[0]
    }

    getActive() {
        return Boolean(this.active)
    }

    setNickname(nickname) {
        if (typeof nickname !== 'string') return

        this.nickname = nickname
    }

    setSkinColorIndex(skinColorIndex) {
        if (typeof skinColorIndex !== 'number') return

        this.skinColorIndex = skinColorIndex
    }

    setActive(active) {
        if (typeof active !== 'boolean') return

        this.active = active
    }
}