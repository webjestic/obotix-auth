

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
            token: fnlib.randomHex(obotix.getConfig().auth.tokenSize)
        }
    }
}

function checkRequiredUserFields(req) {
    var response = { message: '' }
    if (req.body.username === undefined) 
        response.message = 'Username expected but not found.'
    
    if (req.body.email === undefined) 
        response.message = 'Email expected but not found.'
    
    return response
}


function routePostUserKey(req, res) {
    var response = {}
    if (checkRequiredUserFields().message !== '') 
        response.status = 400
    else {
        response = routeGetKey(req, res)
        if (response.status === 200) {
            response.data.username = req.body.username
            response.data.email = req.body.email
        }
    }
    return response
}

// eslint-disable-next-line no-unused-vars
function routePostUserToken(req, res) {
    var response = {}
    if (checkRequiredUserFields().message !== '') 
        response.status = 400
    else {
        response = routeGetToken(req, res)

        if (response.status === 200) {
            response.data.username = req.body.username
            response.data.email = req.body.email
        }
    }
    return response
}

export default {
    routeGetKey,
    routeGetToken,
    routePostUserKey,
    routePostUserToken
}

