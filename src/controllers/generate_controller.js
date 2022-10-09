

import fnlib from 'fnlib'
import obotix from 'obotix'

var log = undefined

function init() {
    if (log === undefined) log = obotix.getLogger('auth:genCtl')
}


// eslint-disable-next-line no-unused-vars
function routeGetKey(req, res) {
    init()
    return {
        status: 200,
        message: '',
        data: {
            key: fnlib.randomUUID()
        }
    }
}

// eslint-disable-next-line no-unused-vars
function routeGetToken(req, res) {
    init()
    return {
        status: 200,
        message: '',
        data: {
            token: fnlib.randomHex(512)
        }
    }
}

function routePostUserKey(req, res) {
    var response = routeGetKey(req, res)
    response.data.username = req.body.username
    response.data.email = req.body.email
    return response
}

// eslint-disable-next-line no-unused-vars
function routePostUserToken(req, res) {
    var response = routeGetToken(req, res)
    response.data.username = req.body.username
    response.data.email = req.body.email
    return response
}

export default {
    routeGetKey,
    routeGetToken,
    routePostUserKey,
    routePostUserToken
}

