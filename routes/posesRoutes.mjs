import { Router } from "express"
import {getAllPoses, getPosesByOptions} from "../database/databaseHandler.mjs"

export const poseRoutes = Router()

poseRoutes.get('/', async (request, response)=>{
    const name = request.query.name
    const difficultyLevel = request.query.level
    const categoryID = request.query.category
    const bodyPart = request.query.bodyPart
    const optionsObject = {name : name, bodyPart : bodyPart, difficultyLevel : undefined, categoryID : undefined}

    if(difficultyLevel)
    {
        optionsObject.difficultyLevel = parseInt(difficultyLevel, 10)  
    }

    if(categoryID)
    {
        optionsObject.categoryID = parseInt(categoryID, 10)
    }

    if(!name && !difficultyLevel && !categoryID && !bodyPart)
    {
        response.json(await getAllPoses())
    }
    else
    {
        console.log(optionsObject)
        response.json(await getPosesByOptions(optionsObject))
    }
})