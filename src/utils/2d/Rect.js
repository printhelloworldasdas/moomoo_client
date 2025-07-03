import Line from "./Line.js";
import Vector from "./Vector.js"

class Rect {
    constructor({ x, y, width, height, angle }) {
        this.center = new Vector(x, y)
        this.size = new Vector(width, height)
        this.angle = angle
    }

    getAxis() {
        const originX = new Vector(1, 0)
        const originY = new Vector(0, 1)
        const rotatedX = originX.getRotate(this.angle)
        const rotatedY = originY.getRotate(this.angle)

        return [
            new Line({ x: this.center.x, y: this.center.y, dx: rotatedX.x, dy: rotatedX.y }),
            new Line({ x: this.center.x, y: this.center.y, dx: rotatedY.x, dy: rotatedY.y })
        ]
    }

    getCorners() {
        const axis = this.getAxis()
        const rotatedX = axis[0].direction.getMult(this.size.x / 2)
        const rotatedY = axis[1].direction.getMult(this.size.y / 2)

        return [
            this.center.getAdd(rotatedX).getAdd(rotatedY),
            this.center.getAdd(rotatedX).getAdd(rotatedY.getMult(-1)),
            this.center.getAdd(rotatedX.getMult(-1)).getAdd(rotatedY.getMult(-1)),
            this.center.getAdd(rotatedX.getMult(-1)).getAdd(rotatedY)
        ]
    }
}

export default Rect