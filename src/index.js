import express from 'express'
import mongoose from 'mongoose'
import taskrouter from './routes/task.routes.js'
const APP_PORT = 5050
const MONGODB = 'mongodb+srv://rolling:GU4O7wpsx29gbw3J@cluster0.7li0xrr.mongodb.net/rolling'
try {
    await mongoose.connect(MONGODB)

    const app = express()

    app.listen(APP_PORT, () => {
        console.log(`Backend iniciado en puerto ${APP_PORT} vbb`)
    })
app.use('/task/route', taskrouter)
} catch(err) {
    console.log(`ERROR al inicializar backend: ${err.message}`)
}