
import obotix from 'obotix'
import controller from '../controllers/generate_controller.js'

var log = undefined

// {endpoint}/auth/generate
export default function (router) {
    if (log === undefined) log = obotix.getLogger('route:genToken')

    router.get('/key', (req, res) => {
        const response = controller.routeGetKey(req, res)
        res.status(response.status).json(response)
    })

    router.get('/token', (req, res) => {
        const response = controller.routeGetToken(req, res)
        res.status(response.status).json(response)
    })

    router.post('/user/key', (req, res) => {
        const response = controller.routePostUserKey(req, res)
        res.status(response.status).json(response)
    })

    router.post('/user/token', (req, res) => {
        const response = controller.routePostUserToken(req, res)
        res.status(response.status).json(response)
    })

    return router
}
