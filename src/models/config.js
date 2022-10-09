
import obotix from 'obotix'
import { Schema } from 'mongoose'

var log = undefined
var mongoose = undefined

var configSchema = undefined
var Config = undefined

function init() {
    if (Config === undefined) {
        log = obotix.getLogger('auth:config')
        mongoose = obotix.mongo.mongoose

        configSchema = new Schema({ any: Schema.Types.Mixed }, { strict: false })
        Config = mongoose.model('Config', configSchema)
    }
}

async function load() {
    init()
    const doc = await Config.findOne({ 'CONFIG_APP': 'auth' }).exec() 
    log.debug(doc)
    log.debug(doc.CONFIG_APP)
    log.debug(doc.APP_NAME)
    obotix.setConfig(doc._doc)
}

export default {
    init,
    load
}
