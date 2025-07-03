import { input } from "../const.js"

window.addEventListener("mousemove", (event) => {
    input.mouse.setTo(event.clientX, event.clientY)
})