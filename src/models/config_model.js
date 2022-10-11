
import obotix from 'obotix'
import { Schema } from 'mongoose'

var log = undefined
var mongoose = undefined

var configSchema = undefined
var Config = undefined
var onConfigChange = undefined

function initModel() {
    if (Config === undefined) {
        log = obotix.getLogger('auth:config')
        mongoose = obotix.mongo.mongoose
        configSchema = new Schema({ any: Schema.Types.Mixed }, { strict: false })
        Config = mongoose.model('Config', configSchema)
        onConfigChange = Config.watch()
        onConfigChange.on('change', change => {
            configChange(change) 
        })
    }
}

function configChange(change) {
    if (obotix.getConfig()._id.toString() === change.documentKey._id.toString()) {
        log.info('auth config db updated.')
        loadData()
    }
}

async function loadData() {
    const doc = await Config.findOne({ 'CONFIG_APP': process.env.OAPI_CONFIG_APP }).exec() 
    obotix.setConfig(doc)
    log.info(`${obotix.getConfig().CONFIG_APP} config loaded.`)
}

export default {
    initModel,
    loadData
}
