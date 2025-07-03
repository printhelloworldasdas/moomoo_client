import utils from "../../utils/index.js"
import { gameConfig } from "../const.js"
import Player from "../entities/player/Player.js"
import Renderer from "./Renderer.js"

export default class Camera extends utils.Point {
    constructor(scene) {
        super(0, 0, 0, 0)

        this.tiedScene = scene

        this.xOffset = 0
        this.yOffset = 0
    }

    follow(point) {
        if (!(point instanceof Player)) {
            this.setTo(
                gameConfig.gameMap.metrics.width / 2,
                gameConfig.gameMap.metrics.height / 2
            )
        } else {
            const distance = this.distanceTo(point)
            const angle = this.angleTo(point)
            const speed = Math.min(distance * .01 * Renderer.delta, distance)

            if (distance > .05) {
                this.x += speed * Math.cos(angle)
                this.y += speed * Math.sin(angle)
            } else {
                this.setTo(point.x, point.y)
            }
        }

        this.xOffset = this.x - (this.tiedScene.getScaledWidth() / 2)
        this.yOffset = this.y - (this.tiedScene.getScaledHeight() / 2)
    }
}