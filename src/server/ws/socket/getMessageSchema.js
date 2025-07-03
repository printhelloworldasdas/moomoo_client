import { gameProtocol } from "../../const.js"

class Schema {
    constructor(type, data) {
        this.packetId = type
        this.data = data

        this.Schema = Schema

        if (typeof data !== 'object') return this

        for (const key of Object.keys(data)) {
            this[key] = data[key]
        }
    }
}

export default function(data) {
    const [ type, content ] = data

    let schema = new Schema(data)

    switch (type) {
        case gameProtocol.CLIENT.TEST_PACKET:
            schema = new Schema(type, data[1])
        break

        case gameProtocol.CLIENT.ENTER_GAME:
            schema = new Schema(type, { 
                nickname: content[0],
                skinColorIndex: content[1]
            })
        break

        case gameProtocol.CLIENT.UPDATE_WATCH_ANGLE:
            schema = new Schema(type, { 
                watchAngle: content[0]
            })
        break

        case gameProtocol.CLIENT.UPDATE_MOVE_ANGLE:
            schema = new Schema(type, { 
                moveAngle: content[0]
            })
        break
    }

    return schema
}