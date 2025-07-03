import UINode from "./UINode.js"
import EnterGame from "./components/EnterGame.js"
import LoadingText from "./components/LoadingText.js"
import NicknameInput from "./components/NicknameInput.js"
import SelectSkinColorList from "./components/SelectSkinColorList.js"

export default class UI {
    constructor() {
        this.loadingText = new LoadingText()
        this.nicknameInput = new NicknameInput()
        this.enterGame = new EnterGame()
        this.selectSkinColorList = new SelectSkinColorList()

        this.mainMenu = new UINode("#main_menu")
        this.cardsContainer = new UINode("#cards_container")
    }
}