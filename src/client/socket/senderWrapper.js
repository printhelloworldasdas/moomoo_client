import { gameConfig, gameProtocol, storage, ui } from "../const.js"
import Socket from "./Socket.js"

export default function(socket) {
    if (!(socket instanceof Socket)) return false

    socket.sender.on(gameProtocol.CLIENT.ENTER_GAME, (data) => {
        const { nickname, skinColorIndex } = data

        if (typeof nickname !== 'string' || typeof skinColorIndex !== 'number') return
        if (nickname.length > gameConfig.entities.player.nickname.maxLength || typeof nickname.toString !== 'function') return
        if (typeof gameConfig.entities.player.skin.colors[skinColorIndex] !== 'string') return

        ui.cardsContainer.hide()
        ui.loadingText.toLoading().show()

        socket._sendMessage(gameProtocol.CLIENT.ENTER_GAME, nickname, skinColorIndex, data)

        storage.set("enterGameData", data)
    })

    socket.sender.on(gameProtocol.CLIENT.UPDATE_WATCH_ANGLE, ({ watchAngle }) => {
        if (typeof watchAngle !== 'number') return
        if (isNaN(watchAngle) || !isFinite(watchAngle)) return
        if (watchAngle < -Math.PI || watchAngle > Math.PI) return

        socket._sendMessage(gameProtocol.CLIENT.UPDATE_WATCH_ANGLE, watchAngle)
    })

    socket.sender.on(gameProtocol.CLIENT.UPDATE_MOVE_ANGLE, ({ moveAngle }) => {
        if (moveAngle !== null) {
            if (typeof moveAngle !== 'number') return
            if (isNaN(moveAngle) || !isFinite(moveAngle)) return
            if (moveAngle < -Math.PI || moveAngle > Math.PI) return
        }

        socket._sendMessage(gameProtocol.CLIENT.UPDATE_MOVE_ANGLE, moveAngle)
    })
}