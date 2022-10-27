

import obotix from 'obotix'
import generateRoute from './routes/generate_route.js'
import userRoute from './routes/user_route.js'
import config from './models/config_model.js'
import user from './models/user_model.js'

var log = undefined
var router = undefined


async function setup() {
    log = obotix.logger.getLogger('auth:auth')
    config.initModel()
    await config.loadData()
    user.initModel()
}

function setupRouter() {
    router.use('/auth/generate', generateRoute(router))
    router.use('/auth/user', userRoute(router))
    // router.use('/auth/google')
    // router.use('/auth/twitter')
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
