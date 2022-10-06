
import obotix from 'obotix'

await obotix.init()
const log = obotix.logger.getLogger('app:index')
obotix.logger.setLogLevel('trace')

obotix.listen( () => {
    log.info(`Service Listening on ${process.env.OBOTIX_PORT}`)
})
