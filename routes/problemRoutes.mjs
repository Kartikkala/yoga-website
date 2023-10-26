import { Router } from "express"
import { getAllProblems } from "../database/databaseHandler.mjs"

export const problemsRouter = Router()

problemsRouter.get('/', async (request, response)=>{
    response.json(await getAllProblems())
})