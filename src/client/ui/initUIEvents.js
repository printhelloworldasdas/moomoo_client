import { ui } from "../const.js"

export default function() {
    ui.enterGame.on("click", ui.enterGame.onClick.bind(ui.enterGame))
}