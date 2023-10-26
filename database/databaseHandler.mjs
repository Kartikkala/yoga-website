import { MongoClient } from "mongodb"
const connectionString = process.env.MONGO_CONNECTION_STRING
const mongodb = new MongoClient(connectionString)

const db = mongodb.db("yoga")
const posesCollection = db.collection("poses_with_targets")
const bodyParts = db.collection("body_parts")
const categoryCollection = db.collection("categories")

export function getAllPoses()
{
    return posesCollection.find().sort({ difficulty_level: 1 }).toArray()
}

export function getPosesByOptions(options)
{
    let name = options.name
    let difficultyLevel = options.difficultyLevel
    let categoryID = options.categoryID
    let bodyPart = options.bodyPart
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
            return posesCollection.findOne({ $or : [{english_name : pose}, {sanskrit_name : pose}, {sanskrit_name_adapted : pose}]})
        }
        else if(bodyPart && difficultyLevel)
        {
            return posesCollection.find({$and : [{targets : { $regex: bodyPart, $options: "i" }}, {difficulty_level: difficultyLevel}]}).toArray()
        }
        else if(categoryID && difficultyLevel)
        {
            return posesCollection.find({$and : [{category_id : categoryID}, {difficultyLevel : difficultyLevel}]}).toArray()
        }
        else if(bodyPart && categoryID)
        {
            return {'message' : "Body part and categoryID are not together supported!!!"}
        }
        else if(bodyPart)
        {
            return posesCollection.find({targets : { $regex: bodyPart, $options: "i" }}).sort({ difficulty: 1 }).toArray()
        }
        else if(categoryID)
        {
            return posesCollection.find({category_id : categoryID}).sort({ difficulty: 1 }).toArray()
        }
        else if(difficultyLevel)
        {
            return posesCollection.find({difficulty_level : difficultyLevel}).toArray()
        }
    }
    catch(exception){
        console.log(exception)
    } 
}


export function getAllCategories()
{
    return categoryCollection.find().toArray()
}