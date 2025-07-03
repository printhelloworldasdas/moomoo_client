import { gameConfig, gameProtocol } from "../../const.js"

export default function(schema) {
    const entitiesConfig = gameConfig.entities
    const playerConfig = entitiesConfig.player

    switch (schema.packetId) {
        case gameProtocol.CLIENT.ENTER_GAME:
            if (typeof schema.nickname !== 'string' || typeof schema.skinColorIndex !== 'number') return false
            if (typeof schema.nickname.toString !== 'function') return false
            if (schema.nickname.length > playerConfig.nickname.maxLength) return false
            if (typeof playerConfig.skin.colors[schema.skinColorIndex] !== 'string') return false
        break

        case gameProtocol.CLIENT.UPDATE_WATCH_ANGLE:
            if (typeof schema.watchAngle !== 'number') return false
            if (isNaN(schema.watchAngle) || !isFinite(schema.watchAngle)) return false
            if (schema.watchAngle < -Math.PI || schema.watchAngle > Math.PI) return false
        break

        case gameProtocol.CLIENT.UPDATE_MOVE_ANGLE:
            if (schema.moveAngle !== null) {
                if (typeof schema.moveAngle !== 'number') return false
                if (isNaN(schema.moveAngle) || !isFinite(schema.moveAngle)) return false
                if (schema.moveAngle < -Math.PI || schema.moveAngle > Math.PI) return false
            }
        break
    }

    return true
}