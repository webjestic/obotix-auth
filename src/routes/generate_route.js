
import obotix from 'obotix'
import controller from '../controllers/generate_controller.js'

var log = undefined

// {endpoint}/auth/generate
export default function (router) {
    if (log === undefined) log = obotix.getLogger('route:genToken')
    controller.init()

    router.get('/key', (req, res) => {
        const response = controller.getKey(req, res)
        res.status(response.status).json(response)
    })

    router.get('/token', (req, res) => {
        const response = controller.getToken(req, res)
        res.status(response.status).json(response)
    })

    router.post('/user/key', (req, res) => {
        const response = controller.postUserKey(req, res)
        res.status(response.status).json(response)
    })

    router.post('/user/token', (req, res) => {
        const response = controller.postUserToken(req, res)
        res.status(response.status).json(response)
    })

    return router
}
