
import obotix from 'obotix'
import auth from './auth.js'

await obotix.init()
const log = obotix.getLogger('app:index')
obotix.setLogLevel('trace')

const router = await auth.Router()
obotix.addRouter( router )

obotix.listen( () => {
    log.info(`Service Listening on ${process.env.OAPI_PORT}`)
})
