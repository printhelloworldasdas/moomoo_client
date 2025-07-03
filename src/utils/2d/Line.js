import Vector from "./Vector.js"

class Line {
    constructor({ x, y, dx, dy }) {
        this.origin = new Vector(x, y)
        this.direction = new Vector(dx, dy)
    }
}

export default Line