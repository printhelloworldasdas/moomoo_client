import utils from "../../utils/index.js"
import { gameConfig } from "../const.js"
import EntityCollisions from "./EntityCollisions.js"
import EntityMovement from "./EntityMovement.js"

export default class Entity extends utils.Point {
    constructor({ eid, x, y, scale, health, maxHealth, collisionTypes }) {
        super(x, y, scale)

        this.eid = eid
        this.scale = scale
        this.health = health
        this.maxHealth = maxHealth

        this.watchAngle = Math.randomAngle()

        this.movement = new EntityMovement(this)
        this.collisions = new EntityCollisions(this, collisionTypes)
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

    getWatchAngle() {
        return this.watchAngle
    }

    getScale() {
        return this.scale
    }

    setHealth(health) {
        if (typeof health !== 'number') return false

        this.health = Math.max(0, Math.min(this.getMaxHealth(), health))
    }

    setWatchAngle(watchAngle) {
        if (typeof watchAngle !== 'number') return false

        this.watchAngle = Math.max(-Math.PI, Math.min(Math.PI, watchAngle))
    }

    checkCanSee(entity) {
        if (!entity) return false

        const mult = 1.3
        const difX = Math.abs(entity.x - this.x) - entity.getScale()
        const difY = Math.abs(entity.y - this.y) - entity.getScale()
        const checkX = difX <= (gameConfig.scene.viewport.width / 2) * mult
        const checkY = difY <= (gameConfig.scene.viewport.height / 2) * mult

        return Boolean(checkX && checkY)
    }
}