

import fnlib from 'fnlib'
import obotix from 'obotix'

var log = undefined

function init() {
    if (log === undefined) log = obotix.getLogger('auth:genCtl')
}


// eslint-disable-next-line no-unused-vars
function getKey(req, res) {
    return {
        status: 200,
        message: '',
        data: {
            type: 'v4',
            key: fnlib.randomUUID()
        }
    }
}

// eslint-disable-next-line no-unused-vars
function getToken(req, res) {
    let tokenSize = 512
    if (obotix.config !== undefined && obotix.getConfig().auth.tokenSize !== undefined)
        tokenSize = obotix.getConfig().auth.tokenSize
    return {
        status: 200,
        message: '',
        data: {
            size: tokenSize,
            token: fnlib.randomHex(tokenSize)
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


function postUserKey(req, res) {
    var response = {}
    if (checkRequiredUserFields(req).message !== '') 
        response.status = 400
    else {
        response = getKey(req, res)
        if (response.status === 200) {
            response.data.username = req.body.username
            response.data.email = req.body.email
        }
    }
    return response
}

// eslint-disable-next-line no-unused-vars
function postUserToken(req, res) {
    var response = {}
    if (checkRequiredUserFields(req).message !== '') 
        response.status = 400
    else {
        response = getToken(req, res)

        if (response.status === 200) {
            response.data.username = req.body.username
            response.data.email = req.body.email
        }
    }
    return response
}

export default {
    init,
    getKey,
    getToken,
    postUserKey,
    postUserToken
}

