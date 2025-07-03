import { gameProtocol } from "../const.js"

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
        case gameProtocol.SERVER.CREATE_LOCAL_PLAYER:
            schema = new Schema(type, { 
                sid: content[0],
                nickname: content[1],
                skinColorIndex: content[2],
                x: content[3],
                y: content[4],
                watchAngle: content[5]
            })
        break

        case gameProtocol.SERVER.ADD_PLAYER:
            schema = new Schema(type, { 
                sid: content[0],
                nickname: content[1],
                skinColorIndex: content[2],
                x: content[3],
                y: content[4],
                watchAngle: content[5],
                health: content[6]
            })
        break

        case gameProtocol.SERVER.REMOVE_PLAYER:
            schema = new Schema(type, { 
                sid: content[0]
            })
        break

        case gameProtocol.SERVER.UPDATE_PLAYERS:
            const playersData = new Map()

            for (let i = 1; i < content[0].length; i += content[0][0]) {
                playersData.set(content[0][i], {
                    sid: content[0][i],
                    x: content[0][i + 1],
                    y: content[0][i + 2],
                    watchAngle: content[0][i + 3]
                })
            }

            schema = new Schema(type, { playersData })
        break
    }

    return schema
}