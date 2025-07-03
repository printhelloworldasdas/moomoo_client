import { gameConfig, images, mainContext, scene } from "../../const.js"

export default class PlayerDrawing {
    constructor(targetPlayer) {
        this.targetPlayer = targetPlayer
    }

    drawHand(side) {
        const hands = gameConfig.entities.player.skin.hands
        const offsetX = this.targetPlayer.getScale() * Math.cos((Math.PI / 4) * (side === "left" ? 1 : -1))
        const offsetY = this.targetPlayer.getScale() * Math.sin((Math.PI / 4) * (side === "left" ? 1 : -1))

        mainContext.save()
        mainContext.fillStyle = this.targetPlayer.getSkinColor()
        mainContext.strokeStyle = hands.strokeColor
        mainContext.lineWidth = hands.strokeWidth
        mainContext.lineJoin = "miter"

        mainContext.translate(this.targetPlayer.x - scene.getXOffset(), this.targetPlayer.y - scene.getYOffset())
        mainContext.rotate(this.targetPlayer.getWatchAngle(this.targetPlayer.isLocalPlayer()))
        mainContext.beginPath()
        mainContext.arc(offsetX, offsetY, 14, 0, Math.PI * 2)
        mainContext.fill()
        mainContext.stroke()
        mainContext.closePath()
        mainContext.restore()
    }

    drawHands() {
        this.drawHand("left")
        this.drawHand("right")
    }

    drawBody() {
        const body = gameConfig.entities.player.skin.body

        mainContext.save()
        mainContext.fillStyle = this.targetPlayer.getSkinColor()
        mainContext.strokeStyle = body.strokeColor
        mainContext.lineWidth = body.strokeWidth
        mainContext.lineJoin = "miter"

        mainContext.translate(this.targetPlayer.x - scene.getXOffset(), this.targetPlayer.y - scene.getYOffset())
        mainContext.rotate(this.targetPlayer.getWatchAngle(this.targetPlayer.isLocalPlayer()))
        mainContext.beginPath()
        mainContext.arc(0, 0, this.targetPlayer.getScale(), 0, Math.PI * 2)
        mainContext.fill()
        mainContext.stroke()
        mainContext.closePath()
        mainContext.restore()
    }
}