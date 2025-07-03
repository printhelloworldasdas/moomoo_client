import { gameConfig } from "../../const.js"

export default function drawBackground() {
    const context = this.getRenderContext()

    context.save()
    context.fillStyle = gameConfig.gameMap.color

    context.fillRect(0, 0, this.getScaledWidth(), this.getScaledHeight())
    context.restore()
}