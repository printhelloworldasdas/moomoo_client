import utils from "../../utils/index.js"
import { gameConfig, ticker } from "../const.js"
import EntityCollisions from "./EntityCollisions.js"

export default class EntityMovement {
    constructor(targetEntity) {
        this.targetEntity = targetEntity

        this.velocity = new utils.Vector(0, 0)

        this.moveAngle = null

        this.isMove = false
    }

    getVelocity() {
        return this.velocity
    }

    getMoveAngle() {
        return this.moveAngle
    }

    getMoveAngleXY() {
        const moveAngle = this.getMoveAngle()

        return new utils.Vector(
            (moveAngle === null ? 0 : Math.cos(moveAngle)), 
            (moveAngle === null ? 0 : Math.sin(moveAngle))
        )
    }

    setMoveAngle(moveAngle) {
        this.moveAngle = moveAngle
    }

    updateVelocity() {
        if (this.getMoveAngle() === null) return

        const moveDirection = this.getMoveAngleXY()

        if (moveDirection.length()) {
            moveDirection.div(moveDirection.length())
        }

        if (moveDirection.x) this.velocity.x += moveDirection.x * this.targetEntity.getMovementSpeed() * ticker.tickDelta
        if (moveDirection.y) this.velocity.y += moveDirection.y * this.targetEntity.getMovementSpeed() * ticker.tickDelta
    }

    updatePosition() {
        const velocity = this.getVelocity()
        const point1 = new utils.Vector(0, 0)
        const point2 = new utils.Vector(velocity.x * ticker.tickDelta, velocity.y * ticker.tickDelta)
        const currentMoveSpeed = point1.distanceTo(point2)
        const speedDepth = Math.min(4, Math.max(1, Math.round(currentMoveSpeed / 40)))
        const depthMult = 1 / speedDepth

        for (let i = 0; i < speedDepth; ++i) {
            if (velocity.x) this.targetEntity.x += (velocity.x * ticker.tickDelta) * depthMult
            if (velocity.y) this.targetEntity.y += (velocity.y * ticker.tickDelta) * depthMult

            this.targetEntity.collisions.update()
        }
    }

    updateVelocityDecel() {        
        if (this.velocity.x) {
            this.velocity.x *= Math.pow(this.targetEntity.getMovementDecel(), ticker.tickDelta)

            if (this.velocity.x <= 0.01 && this.velocity.x >= -0.01) this.velocity.x = 0
        }

        if (this.velocity.y) {
            this.velocity.y *= Math.pow(this.targetEntity.getMovementDecel(), ticker.tickDelta)

            if (this.velocity.y <= 0.01 && this.velocity.y >= -0.01) this.velocity.y = 0
        }
    }

    update() {
        if (!(this.targetEntity.collisions instanceof EntityCollisions)) {
            throw new Error(`class.EntityMovement cannot work without class.EntityCollisions`)
        }

        this.updateVelocity()
        this.updatePosition()
        this.updateVelocityDecel()
    }
}