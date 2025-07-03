import express from "express"
import path from "path"
import { WebSocketServer } from "ws"
import { __dirname, gameConfig, wsServer } from "./src/server/const.js"

const app = express()
const wss = new WebSocketServer({ noServer: true })

wss.on("connection", (ws) => {
    wsServer.createSocket(ws)
})

app.listen(gameConfig.serverData.port, () => {
    console.log(`Local server url: http://localhost:${gameConfig.serverData.port}`)
}).on("upgrade", (request, socket, head) => {
    if (request.url !== "/new+connection") return

    wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit("connection", ws, request)
    })
})

app.use(express.static(path.join(__dirname, "../../", "public")))

for (const fileRequest of gameConfig.serverData.fileRequests) {
    const urlPath = Array.isArray(fileRequest) ? fileRequest[0] : fileRequest
    const filePath = Array.isArray(fileRequest) ? fileRequest[1] : fileRequest

    app.get(urlPath, (_, response) => {
        const responseFilePath = path.join(__dirname, "../../", "public", filePath)

        response.sendFile(responseFilePath)
    })
}