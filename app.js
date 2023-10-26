import express from 'express'


import { categoryRoutes } from "./routes/categoriesRoutes.mjs"
import { poseRoutes } from "./routes/posesRoutes.mjs"
import {bodyPartsRouter} from './routes/bodyPartsRoutes.mjs'

const app = express()
const port = 8000

app.get('/', (request, response)=>{
    response.redirect('/v1/poses')
})
app.use('/v1/poses', poseRoutes)
app.use('/v1/categories', categoryRoutes)
app.use('/v1/bodyParts', bodyPartsRouter)


app.listen(port, '0.0.0.0', ()=>{ console.log("Listening on port "+port+"...")})