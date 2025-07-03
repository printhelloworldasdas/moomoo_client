import { gameConfig } from "../const.js"
import utils from "../../utils/index.js"
import { onInit, onSceneResize } from "./SceneEvents.js"
import Renderer from "../render/Renderer.js"
import Camera from "../render/Camera.js"
import Drawing from "../render/drawing/Drawing.js"

export default class Scene extends utils.Emitter {
    constructor(selector) {
        super()

        this.view = document.querySelector(selector)
        
        this.scale = 1
        this.viewport = gameConfig.scene.viewport

        this.renderer = new Renderer(this)
        this.camera = new Camera(this)
        this.drawing = new Drawing(this)

        this.on("init", onInit.bind(this))
        this.on("scene-resize", onSceneResize.bind(this))
    }

    getRenderContext() {
        return this.view.getContext("2d")
    }

    getScale() {
        return this.scale
    }

    getXOffset() {
        return this.camera.xOffset
    }

    getYOffset() {
        return this.camera.yOffset
    }

    getWidth() {
        return this.view.width
    }

    getHeight() {
        return this.view.height
    }

    getScaledWidth() {
        return this.getWidth() / this.getScale()
    }

    getScaledHeight() {
        return this.getHeight() / this.getScale()
    }

    setScale(scale) {
        if (typeof scale === 'string') {
            scale = scale.toNumber()
        }

        this.scale = scale
    }

    setSize(width, height) {
        this.view.width = width
        this.view.height = height

        this.view.style.width = `${width}px`
        this.view.style.height = `${height}px`
    }
}