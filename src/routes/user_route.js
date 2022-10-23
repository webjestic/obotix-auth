
import obotix from 'obotix'
import controller from '../controllers/user_controller.js'

var log = undefined

// {endpoint}/auth/user
export default function (router) {
    if (log === undefined) log = obotix.getLogger('route:genToken')
    controller.init()

    router.get('/', async (req, res) => {
        const response = controller.getProfile(req, res)
        res.status(response.status).json(response)
    })

    router.put('/', async (req, res) => {
        const response = controller.updateProfile(req, res)
        res.status(response.status).json(response)
    })

    router.delete('/', async (req, res) => {
        const response = controller.deleteUser(req, res)
        res.status(response.status).json(response)
    })

    router.post('/login', async (req, res) => {
        const response = await controller.loginUser(req, res)
        res.status(response.status).json(response)
    })

    router.post('/register',async (req, res) => {
        const response = await controller.registerUser(req, res)
        res.status(response.status).json(response)
    })

    return router
}