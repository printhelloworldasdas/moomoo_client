import { gameProtocol, socket, ui } from "../../const.js"
import UINode from "../UINode.js"

export default class EnterGame extends UINode {
    constructor() {
        super("#enter_game")
    }

    onClick() {
        socket.sender.emit(gameProtocol.CLIENT.ENTER_GAME, {
            nickname: ui.nicknameInput.getNickname(),
            skinColorIndex: ui.selectSkinColorList.getActiveSkinColorIndex()
        })
    }
}