import express from 'express'


import { categoryRoutes } from "./routes/categoriesRoutes.mjs"
import { poseRoutes } from "./routes/posesRoutes.mjs"

const app = express()
const port = 8000

app.use('/v1/poses', poseRoutes)
app.use('/v1/categories', categoryRoutes)

app.listen(port, '0.0.0.0', ()=>{ console.log("Listening on port "+port+"...")})