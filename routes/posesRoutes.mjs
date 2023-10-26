import { Router } from "express"
import {getAllPoses, getPosesByOptions} from "../database/databaseHandler.mjs"

export const poseRoutes = Router()

poseRoutes.get('/', async (request, response)=>{
    const name = request.query.name
    const difficultyLevel = request.query.level
    const categoryID = request.query.category
    const bodyPart = request.query.bodyPart
    const problem = request.query.problem
    const optionsObject = {name : name, bodyPart : bodyPart, difficultyLevel : undefined, categoryID : undefined, problem : undefined}

    if(difficultyLevel)
    {
        optionsObject.difficultyLevel = parseInt(difficultyLevel, 10)  
    }

    if(categoryID)
    {
        optionsObject.categoryID = parseInt(categoryID, 10)
    }

    if(problem)
    {
        optionsObject.problem = problem.toLowerCase()
    }

    if(!name && !difficultyLevel && !categoryID && !bodyPart && !problem)
    {
        response.json(await getAllPoses())
    }
    else
    {
        console.log(optionsObject)
        response.json(await getPosesByOptions(optionsObject))
    }
})