

import obotix from 'obotix'
import generateRoute from './routes/generate_route.js'
import config from './models/config.js'

var log = undefined
var router = undefined


async function setup() {
    log = obotix.logger.getLogger('app:auth')
    await config.load()
}

function setupRouter() {

    router.use('/auth/generate', generateRoute(router))
    // router.use('/generate/base64')
    // router.use('/generate/hex')

}

async function Router() {
    await setup()

    router = obotix.getRouter()
    setupRouter()

    log.debug('Auth Module Router Initialized.')
    return router
}

export default {
    Router
}