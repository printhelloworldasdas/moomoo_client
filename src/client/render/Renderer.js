import utils from "../../utils/index.js"
import { onAddRender, onInit, onUpdateLayers } from "./RendererEvents.js"

export default class Renderer extends utils.Emitter {
    static SYSTEM_LAYER = 0
    static ENTITIES_LAYER = 1
    static ESP_LAYER = 2

    static delta = 0
    static currentUpdateTime = 0
    static lastUpdateTime = 0

    constructor(scene) {
        super()

        this.tiedScene = scene

        this.layers = new Array(3).fill(() => null).map(() => new Map())

        this.on("init", onInit.bind(this))
        this.on("add-render", onAddRender.bind(this))
        this.on("update-layers", onUpdateLayers.bind(this))
    }

    update() {
        const context = this.tiedScene.getRenderContext()

        context.save()
        context.clearRect(0, 0, this.tiedScene.getScaledWidth(), this.tiedScene.getScaledHeight())

        this.emit("update-layers", 0)
        context.restore()

        context.save()
        context.fillStyle = "rgba(0, 0, 70, 0.35)"
        
        context.fillRect(0, 0, this.tiedScene.getScaledWidth(), this.tiedScene.getScaledHeight())
        context.restore()
    }

    static onFrame(callback) {
        Renderer.currentUpdateTime = Date.now()
        Renderer.delta = Renderer.currentUpdateTime - Renderer.lastUpdateTime
        Renderer.lastUpdateTime = Renderer.currentUpdateTime

        callback()

        requestAnimationFrame(Renderer.onFrame.bind(Renderer, callback))
    }
}