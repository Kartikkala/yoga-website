import { Router } from "express"
import { getAllBodyParts } from "../database/databaseHandler.mjs"

export const bodyPartsRouter = Router()

bodyPartsRouter.get("/", async (request, response)=>{
    response.json(await getAllBodyParts())
})