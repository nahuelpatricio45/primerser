import { Router } from 'express'
import taskModel from '../models/task.model.js'
const taskrouter = Router()

taskrouter.get('/status/:status', async (req, res) => {
    try {
        switch (req.params.status) {
            case 'all':
                res.status(200).send({ status: 'OK', data: await taskModel.find() })
                break

            case 'pending':
            case 'finished':
                res.status(200).send({ status: 'OK', data: await taskModel.find({ status: req.params.status }) })
                break
            
            default:
                res.status(400).send({ status: 'OK', data: 'El parámetro de estado no es válido. Solo se acepta all / pending / finished' })
        }
    } catch (err) {
        res.status(500).send({ status: 'ERR', data: err.message })
            
    }
})

taskrouter.get('/', async (req, res) => {
    const tasks = await taskModel.find()
    res.status(200).send({ status: 'OK', data: tasks })
})
///subir tareas
taskrouter.post ('/', async (req,res)=>{
try{

    /// se crea una constante con el modelo de tareas
    const newTask = {
        description: req.body.description,
        target_date: req.body.target_date,
        priority: req.body.priority
    }
/// luego se da la solicitud para crear esa nueva tarea
    const process = await taskModel.create(newTask)
    res.status(200).send({ status: 'OK', data: process })


}
catch(err){ res.status(500).send({ status: 'ERR', data: err.message })}

})
//eliminar tarea
taskrouter.delete('/:tid', async (req, res) => {
    try {
        const process = await taskModel.findOneAndDelete({ _id: req.params.tid })
        res.status(200).send({ status: 'OK', data: process === null ? 'No se encontró la tarea': 'Tarea borrada' })
    } catch (err) {
        res.status(500).send({ status: 'ERR', data: err.message })
    }
})

export default taskrouter