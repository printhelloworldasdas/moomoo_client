import utils from "../../utils/index.js"
import { gameConfig, input } from "../const.js"
import Renderer from "../render/Renderer.js"
import EntityESP from "./EntityESP.js"

export default class Entity extends utils.Point {
    constructor({ x, y, scale, health, maxHealth, watchAngle }) {
        super(x, y, scale)

        this.scale = scale
        this.health = health
        this.maxHealth = maxHealth
        this.watchAngle = watchAngle

        this.updateTickRate = 0
        this.currentUpdateTickTime = null
        this.oldUpdateTickTime = null

        this.tickPosition = new utils.Vector(x, y)
        this.oldTickPosition = new utils.Vector(x, y)

        this.tickWatchAngle = this.watchAngle
        this.oldTickWatchAngle = this.tickWatchAngle
    }

    isFullHealth() {
        return this.getHealth() === this.getMaxHealth()
    }

    getHealth() {
        return this.health
    }

    getMaxHealth() {
        return this.maxHealth
    }

    getWatchAngle(isLocalWatchAngle) {
        return isLocalWatchAngle ? input.mouse.getWatchAngle() : this.watchAngle
    }

    getTickWatchAngle() {
        return this.tickWatchAngle
    }

    getOldTickWatchAngle() {
        return this.oldTickWatchAngle
    }

    getScale() {
        return this.scale
    }

    setHealth(health) {
        if (typeof health !== 'number') return false

        this.health = health
    }

    setWatchAngle(watchAngle) {
        if (typeof watchAngle !== 'number') return false

        this.watchAngle = watchAngle
    }

    setTickWatchAngle(tickWatchAngle) {
        if (typeof tickWatchAngle !== 'number') return false

        this.tickWatchAngle = tickWatchAngle
    }

    setOldTickWatchAngle(oldTickWatchAngle) {
        if (typeof oldTickWatchAngle !== 'number') return false

        this.oldTickWatchAngle = oldTickWatchAngle
    }

    interpolatePosition() {
        const lastTime = Renderer.currentUpdateTime - (1000 / gameConfig.serverData.tps)

        this.updateTickRate += Renderer.delta

        const total = this.currentUpdateTickTime - this.oldUpdateTickTime
        const fraction = lastTime - this.oldUpdateTickTime
        const ratio = fraction / total
        const rate = 170
        const tmpRate = Math.min(1.7, this.updateTickRate / rate)
        const different = this.tickPosition.different(this.oldTickPosition)

        this.setTo(
            this.oldTickPosition.x + (different.x * tmpRate), 
            this.oldTickPosition.y + (different.y * tmpRate)
        )

        this.setWatchAngle(Math.lerpAngle(this.getTickWatchAngle(), this.getOldTickWatchAngle(), Math.min(1.2, ratio)))
    }
}