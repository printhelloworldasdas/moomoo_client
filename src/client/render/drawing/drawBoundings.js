import { gameConfig } from "../../const.js"

export default function drawBoundings() {
    const context = this.getRenderContext()
    const width = this.getScaledWidth()
    const height = this.getScaledHeight()
    const mapWidth = gameConfig.gameMap.metrics.width
    const mapHeight = gameConfig.gameMap.metrics.height

    context.save()
    context.fillStyle = "#000000"
    context.globalAlpha = 0.09

    if (this.getXOffset() <= 0) {
        context.fillRect(0, 0, -this.getXOffset(), height)
    }

    if (mapWidth - this.getXOffset() <= width) {
        const tmpY = Math.max(0, -this.getYOffset())

        context.fillRect(mapWidth - this.getXOffset(), tmpY, width - (mapWidth - this.getXOffset()), height - tmpY)
    }

    if (this.getXOffset() <= 0) {
        context.fillRect(-this.getXOffset(), 0, width + this.getXOffset(), -this.getYOffset())
    }

    if (mapHeight - this.getYOffset() <= height) {
        const tmpX = Math.max(0, -this.getXOffset())

        let tmpMin = 0

        if (mapWidth - this.getXOffset() <= width) {
            tmpMin = width - (mapWidth - this.getXOffset())
        }

        context.fillRect(
            tmpX, mapHeight - this.getYOffset(),
            (width - tmpX) - tmpMin,
            height - (mapHeight - this.getYOffset())
        )
    }

    context.restore()
}