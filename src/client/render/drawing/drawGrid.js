import { gameConfig } from "../../const.js"

export default function drawGrid() {
    const context = this.getRenderContext()
    const width = this.getScaledWidth()
    const height = this.getScaledHeight()

    let gridX = -this.camera.x
    let gridY = -this.camera.y

    context.save()
    context.strokeStyle = "#000000"
    context.globalAlpha = 0.06
    context.lineWidth = 4

    for (let x = gridX; x < width / 2; x += height / 18) {
        const gridWidth = height / 18

        context.strokeRect(gridX, -10, gridWidth, height + 20)

        gridX += (height / 18) * 2
    }

    for (let y = gridY; y < height / 2; y += height / 18) {
        const gridHeight = height / 18

        context.strokeRect(-10, gridY, width + 20, gridHeight)

        gridY += (height / 18) * 2
    }

    context.restore()
}