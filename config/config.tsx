const configFile = require("../config/config.json")

const serverEnv = process.env.NODE_ENV
const config = configFile[serverEnv]

export const BACKEND_URL = config["BACKEND_URL"]
export const IMAGE_URL = config["IMAGE_URL"]
export const REDIRECT_URL = config["REDIRECT_URL"]