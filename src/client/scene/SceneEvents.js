import utils from "../../utils/index.js"
import { input } from "../const.js"
import Player from "../entities/player/Player.js"
import updateEntities from "../entities/updateEntities.js"
import Renderer from "../render/Renderer.js"

export function onSceneResize() {
    const screenWidth = window.innerWidth
    const screenHeight = window.innerHeight
    const context = this.getRenderContext()
    const scale = Math.max(
        screenWidth / this.viewport.width, 
        screenHeight / this.viewport.height
    )

    this.setScale(scale)
    this.setSize(screenWidth, screenHeight)

    context.scale(scale, scale)
}

export function onInit() {
    this.emit("scene-resize")
    this.renderer.emit("init")

    this.renderer.emit("add-render", Renderer.SYSTEM_LAYER, () => {
        input.update()

        this.camera.follow(Player.getLocalPlayer())

        this.drawing.emit("draw-background")
        this.drawing.emit("draw-grid")
        this.drawing.emit("draw-boundings")
    })

    this.renderer.emit("add-render", Renderer.ENTITIES_LAYER, () => {
        updateEntities()
    })

    this.renderer.emit("add-render", Renderer.ESP_LAYER, () => {
        Player.updatePlayersESP()
    })

    window.addEventListener("resize", () => this.emit("scene-resize"))
}