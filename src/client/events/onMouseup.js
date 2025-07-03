import { input } from "../const.js"

window.addEventListener("keyup", (event) => {
    if (!input.keyboard.has(event.keyCode)) return

    input.keyboard.delete(event.keyCode)
})