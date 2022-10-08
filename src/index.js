
import obotix from 'obotix'

await obotix.init()
const log = obotix.getLogger('app:index')
obotix.setLogLevel('trace')

log.debug(typeof obotix)

obotix.listen( () => {
    log.info(`Service Listening on ${process.env.OAPI_PORT}`)
})
