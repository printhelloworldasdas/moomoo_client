import { gameConfig } from "../const.js";
import updateEntities from "../entities/updateEntities.js"

export default class Ticker {
    constructor() {
        this.tickDelta = 0
        this.currentUpdateTime = 0
        this.lastUpdateTime = Date.now()

        setInterval(this.update.bind(this), 1000 / gameConfig.serverData.tps)
    }
    
    update() {
        this.currentUpdateTime = Date.now()
        this.tickDelta = this.currentUpdateTime - this.lastUpdateTime
        this.lastUpdateTime = this.currentUpdateTime

        updateEntities()
    }
}