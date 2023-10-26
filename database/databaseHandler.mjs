import { MongoClient } from "mongodb"
const connectionString = process.env.MONGO_CONNECTION_STRING
const mongodb = new MongoClient(connectionString)

const db = mongodb.db("yoga")
const posesCollection = db.collection("poses_with_targets")
const bodyParts = db.collection("body_parts")
const categoryCollection = db.collection("categories")
const problemsCollection = db.collection("problems")

export function getAllPoses()
{
    return posesCollection.find().sort({ difficulty_level: 1 }).project({_id : 0, id : 0, category_id : 0, target_problems : 0}).toArray()
}

export function getPosesByOptions(options)
{
    let name = options.name
    let difficultyLevel = options.difficultyLevel
    let categoryID = options.categoryID
    let bodyPart = options.bodyPart
    let problem = options.problem
    let result = undefined
    if(difficultyLevel > 3)
    {
        difficultyLevel = 3
    }
    else if(difficultyLevel < 1)
    {
        difficultyLevel = 1
    }

    try{
        if(name)
        {
            result = posesCollection.findOne({ $or : [{english_name : pose}, {sanskrit_name : pose}, {sanskrit_name_adapted : pose}]}).project({_id : 0, id : 0, category_id : 0, target_problems : 0})
        }
        else if(bodyPart && difficultyLevel)
        {
            result = posesCollection.find({$and : [{targets : { $regex: bodyPart, $options: "i" }}, {difficulty_level: difficultyLevel}]}).project({_id : 0, id : 0, category_id : 0, target_problems : 0}).toArray()
        }
        else if(categoryID && difficultyLevel)
        {
            result = posesCollection.find({$and : [{category_id : categoryID}, {difficulty_level : difficultyLevel}]}).project({_id : 0, id : 0, category_id : 0, target_problems : 0}).toArray()
        }
        else if(problem && difficultyLevel)
        {
            result = posesCollection.find({$and : [{target_problems : problem}, {difficulty_level: difficultyLevel}]}).project({_id : 0, id: 0, category_id: 0, target_problems : 0}).toArray()
        }
        else if(bodyPart)
        {
            result = posesCollection.find({targets : { $regex: bodyPart, $options: "i" }}).project({_id : 0, id : 0, category_id : 0, target_problems : 0}).sort({ difficulty_level: 1 }).toArray()
        }
        else if(problem)
        {
            result = posesCollection.find({target_problems : problem}).project({_id : 0, id: 0, category_id: 0, target_problems : 0}).sort({difficulty_level : 1}).toArray()
        }
        else if(categoryID)
        {
            result = posesCollection.find({category_id : categoryID}).project({_id : 0, id : 0, category_id : 0, target_problems : 0}).sort({ difficulty_level: 1 }).toArray()
        }
        else if(difficultyLevel)
        {
            result = posesCollection.find({difficulty_level : difficultyLevel}).project({_id : 0, id : 0, category_id : 0, target_problems : 0}).toArray()
        }
        else
        {
            result = {'message' : "This type of query is not supported!!!"}
        }
    }
    catch(exception){
        result = {'message' : exception}
    } 
    return result
}

export function getAllBodyParts()
{
    try{
        return bodyParts.find().project({_id : 0}).toArray()
    }
    catch(exception)
    {
        return {"message" : exception}
    }
}


export function getAllCategories()
{
    try{
        return categoryCollection.find().project({_id : 0}).sort({category_name : 1}).toArray()
    }
    catch(exception)
    {
        return {"message": exception}
    }
}

export function getAllProblems()
{
    try{
        return problemsCollection.find().project({_id : 0}).sort({problem : 1}).toArray()
    }
    catch(exception)
    {
        return {"message" : exception}
    }
}