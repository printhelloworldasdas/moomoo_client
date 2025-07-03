import { input } from "../const.js"

window.addEventListener("keydown", (event) => {
    if (input.keyboard.has(event.keyCode)) return

    input.keyboard.set(event.keyCode, true)
})