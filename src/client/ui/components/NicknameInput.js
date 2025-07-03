import { gameConfig, storage } from "../../const.js"
import UINode from "../UINode.js"

export default class NicknameInput extends UINode {
    constructor() {
        super("#nickname_input")

        const enterGameData = storage.get("enterGameData")

        if (typeof enterGameData === 'object') {
            this.setValue(enterGameData.nickname) 
        }
    }

    format(nickname) {
        return nickname.slice(0, gameConfig.entities.player.nickname.maxLength)
    }

    getNickname() {
        return this.format(this.value)
    }
}