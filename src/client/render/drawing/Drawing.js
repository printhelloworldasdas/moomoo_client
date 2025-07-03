import utils from "../../../utils/index.js"
import drawBackground from "./drawBackground.js"
import drawBoundings from "./drawBoundings.js"
import drawGrid from "./drawGrid.js"

export default class Drawing extends utils.Emitter {
    constructor(scene) {
        super()

        this.tiedScene = scene

        this.on("draw-background", drawBackground.bind(this.tiedScene))
        this.on("draw-grid", drawGrid.bind(this.tiedScene))
        this.on("draw-boundings", drawBoundings.bind(this.tiedScene))
    }
}