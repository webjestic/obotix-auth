
import obotix from 'obotix'
import auth from './auth.js'

// initialize obotix express handler
await obotix.init()

// retrieve a logging object and set the logging level
const log = obotix.getLogger('auth:index')
obotix.setLogLevel('trace')

// create the  project router 
const router = await auth.Router()

// add the router into obotix
obotix.addRouter( router )

// start listening
obotix.listen( () => {
    log.info(`Service Listening on ${process.env.OAPI_PORT}`)
})
