import { gameConfig, mainContext, scene } from "../const.js"

export default class EntityESP {
    constructor(targetEntity, { nickname }) {
        this.targetEntity = targetEntity
        this.isDrawNickname = nickname
    }

    getNicknameProps() {
        if (this.targetEntity.isPlayer) {
            return gameConfig.entities.player.nickname
        }
    }

    drawNickname() {
        const props = this.getNicknameProps()
        const offsetY = -(this.targetEntity.getScale() + (props.offsetY || 0))

        mainContext.save()
        mainContext.font = props.font
        mainContext.fillStyle = props.fillColor
        mainContext.strokeStyle = props.strokeColor
        mainContext.lineJoin = "round"
        mainContext.textBaseline = "middle"
        mainContext.textAlign = "center"
        mainContext.lineWidth = props.strokeWidth

        mainContext.translate(this.targetEntity.x - scene.getXOffset(), this.targetEntity.y - scene.getYOffset())
        mainContext.strokeText(this.targetEntity.getNickname(), 0, offsetY)
        mainContext.fillText(this.targetEntity.getNickname(), 0, offsetY)
        mainContext.restore()
    }

    draw() {
        if (this.isDrawNickname) this.drawNickname()
    }

    update() {
        this.draw()        
    }
}