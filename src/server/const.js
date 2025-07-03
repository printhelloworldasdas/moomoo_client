import { fileURLToPath } from "url";
import path from "path";
import fs from "fs/promises";

import WSServer from "./ws/WSServer.js";
import Ticker from "./ticker/Ticker.js";

// Paths
export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

// Load JSON files using fs
const configPath = new URL("../config.json", import.meta.url);
const protocolPath = new URL("../protocol.json", import.meta.url);

export const gameConfig = JSON.parse(await fs.readFile(configPath, "utf-8"));
export const gameProtocol = JSON.parse(await fs.readFile(protocolPath, "utf-8"));

// Instances
export const wsServer = new WSServer();
export const ticker = new Ticker();
