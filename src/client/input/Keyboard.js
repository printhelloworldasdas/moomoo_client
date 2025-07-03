import { gameConfig, gameProtocol, socket } from "../const.js"
import Player from "../entities/player/Player.js"

export default class Keyboard extends Map {
    constructor() {
        super()

        this.lastMoveAngle = null
    }

    getLastMoveAngle() {
        return this.lastMoveAngle
    }

    setLastMoveAngle(lastMoveAngle) {
        this.lastMoveAngle = lastMoveAngle
    }

    getMovementKeysState() {
        const movementBinds = gameConfig.binds.movement

        return [
            this.has(movementBinds.left), this.has(movementBinds.right),
            this.has(movementBinds.up), this.has(movementBinds.down)
        ]
    }

    updateMoveAngle() {
        if (!Player.getLocalPlayer()) return

        const localPlayerClone = Player.getLocalPlayer().clone
        const [ left, right, up, down ] = this.getMovementKeysState()
        const xDirection = left && !right ? -1 : !left && right ? 1 : 0
        const yDirection = up && !down ? -1 : !up && down ? 1 : 0
        
        if (xDirection || yDirection) {
            localPlayerClone.position.add(xDirection, yDirection)
            localPlayerClone.updatePhysics()
    
            const moveAngle = Player.getLocalPlayer().angleTo(localPlayerClone)

            if (this.getLastMoveAngle() !== moveAngle) {
                socket.sender.emit(gameProtocol.CLIENT.UPDATE_MOVE_ANGLE, { moveAngle: moveAngle })
            }

            return this.setLastMoveAngle(moveAngle)
        }

        if (this.getLastMoveAngle() === null) return

        socket.sender.emit(gameProtocol.CLIENT.UPDATE_MOVE_ANGLE, { moveAngle: null })

        this.setLastMoveAngle(null)
    }

    update() {
        this.updateMoveAngle()
    }
}