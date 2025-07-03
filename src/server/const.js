import { fileURLToPath } from "url"
import path from "path"
import config from "../config.json" assert { type: "json" }
import protocol from "../protocol.json" assert { type: "json" }
import WSServer from "./ws/WSServer.js"
import Ticker from "./ticker/Ticker.js"

export const __filename = fileURLToPath(import.meta.url)
export const __dirname = path.dirname(__filename)

export const gameConfig = config
export const gameProtocol = protocol

export const wsServer = new WSServer()
export const ticker = new Ticker()