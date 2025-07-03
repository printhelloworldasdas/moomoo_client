import Vector from "./Vector.js"

function getSignedDistance(rect, line, corner) {
    const projected = corner.getProject(line)
    const center = projected.getMinus(rect.center)
    const sign = (center.x * line.direction.x) + (center.y * line.direction.y) > 0
    const signedDistance = center.magnitude * (sign ? 1 : -1)

    return signedDistance
}

export default getSignedDistance