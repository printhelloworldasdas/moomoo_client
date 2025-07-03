import { gameConfig, storage } from "../../const.js"
import UINode from "../UINode.js"

export default class SelectSkinColorList extends UINode {
    constructor() {
        super("#select_skin_color_list")

        this.activeSkinColorIndex = 0

        if (storage.get("enterGameData")) {
            this.activeSkinColorIndex = storage.get("enterGameData").skinColorIndex || 0
        }

        this.createSelectColorItems()
    }

    getActiveSkinColorIndex() {
        return Number(this.activeSkinColorIndex)
    }

    getSelectColorItems() {
        return this.getAll(".select-color-item")
    }

    setActiveSkinColorIndex(skinColorIndex) {
        this.activeSkinColorIndex = parseInt(skinColorIndex)
    }

    eachSelectColorItems(callback) {
        const selectColorItems = this.getSelectColorItems()

        for (const selectColorItem of selectColorItems) {
            callback(selectColorItem)
        }
    }

    createSelectColorItems() {
        for (let i = 0; i < gameConfig.entities.player.skin.colors.length; i++) {
            const skinColor = gameConfig.entities.player.skin.colors[i]
            const selectColorItem = new UINode(document.createElement("li"))

            selectColorItem.addClass("select-color-item")
            selectColorItem.setAttr("sindex", i)
            selectColorItem.setStyle("background", skinColor)

            if (i === this.activeSkinColorIndex) {
                selectColorItem.addClass("active")
            }

            this.append(selectColorItem.node)
        }

        this.createClickEvents()
    }

    createClickEvents() {
        this.eachSelectColorItems((selectColorItem) => {
            const skinColorIndex = selectColorItem.getAttr("sindex")

            selectColorItem.on("click", () => {
                if (selectColorItem.hasClass("active")) return

                this.setActiveSkinColorIndex(skinColorIndex)

                this.eachSelectColorItems((selectColorItem) => {
                    selectColorItem.removeClass("active")
                })

                selectColorItem.addClass("active")
            })
        })
    }
}