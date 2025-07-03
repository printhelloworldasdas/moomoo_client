import Keyboard from "./Keyboard.js"
import Mouse from "./Mouse.js"

export default class Input {
    constructor() {
        this.mouse = new Mouse()
        this.keyboard = new Keyboard()
    }

    update() {
        this.mouse.update()
        this.keyboard.update()
    }
}