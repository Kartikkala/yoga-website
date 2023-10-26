import { Router } from "express"
import {getAllCategories} from "../database/databaseHandler.mjs"

export const categoryRoutes = Router()

categoryRoutes.get('/', async (request, response)=>{
    response.json(await getAllCategories())
})