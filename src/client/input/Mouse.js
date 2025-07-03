import utils from "../../utils/index.js";
import { gameConfig, gameProtocol, scene, socket } from "../const.js";
import Player from "../entities/player/Player.js";
import Renderer from "../render/Renderer.js";

export default class Mouse extends utils.Point {
    constructor() {
        super(0, 0, 1)

        this.lastSentMouseData = undefined
        this.lastSentMouseDataTime = undefined
    }

    getScaledX() {
        return this.x / scene.getScale()
    }

    getScaledY() {
        return this.y / scene.getScale()
    }

    getScaledXY() {
        return new utils.Point(this.getScaledX(),  this.getScaledY(), 1)
    }

    getWatchAngle() {
        if (!(Player.getLocalPlayer() instanceof Player)) return

        const playerToScene = new utils.Point(
            Player.getLocalPlayer().x - scene.getXOffset(),
            Player.getLocalPlayer().y - scene.getYOffset() 
        )

        return playerToScene.angleTo(this.getScaledXY())
    }

    update() {
        const watchAngle = this.getWatchAngle()

        if (this.lastSentMouseData === watchAngle) return
        if (this.lastSentMouseDataTime && (Renderer.currentUpdateTime - this.lastSentMouseDataTime) < 1000 / gameConfig.clientData.sendRate) return

        socket.sender.emit(gameProtocol.CLIENT.UPDATE_WATCH_ANGLE, { watchAngle })

        this.lastSentMouseData = watchAngle
        this.lastSentMouseDataTime = Renderer.currentUpdateTime
    }
}