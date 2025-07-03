import UINode from "../UINode.js"

export default class LoadingText extends UINode {
    constructor() {
        super("#loading_text")
    }

    toLoading() {
        this.setText("Loading...")

        return this
    }

    toConnecting() {
        this.setText("Connecting...")

        return this
    }

    toDisconnected() {
        this.setText("Disconnected")

        return this
    }
}