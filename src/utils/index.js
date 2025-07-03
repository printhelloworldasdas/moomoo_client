import * as GraphicsUtils from "./2d/index.js"
import Emitter from "./Emitter.js"
import "./hooks/index.js"

export default Object.assign({
    Emitter,
    wait(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms))
    }
}, GraphicsUtils)