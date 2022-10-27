

import obotix from 'obotix'
import model from '../models/user_model.js'
import Joi from 'joi'
import fnlib from 'fnlib'
import bcrypt from 'bcrypt'

var log = undefined

function init() {
    if (log === undefined) log = obotix.getLogger('auth:userCtl')
}

async function validateInput(schema, body) {
    let value = {}

    try {
        log.debug('body:', body)
        value = await schema.validateAsync(body)
    } catch (err) {
        log.debug('Catch:', err) 
        log.error('Invalid User Info:', err.message)
        value.errorMsg = `ERROR: ${err.message}`
        value.error = true
    }

    return value
}

async function validateRegisterBody(body) {
    
    const schema = Joi.object({
        username: Joi.string().alphanum().min(4).max(20).required(), // TODO: Force lowercase
        email: Joi.string().email(),
        password: Joi.string().required().pattern(new RegExp('^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$')),
        passwordRepeat: Joi.ref('password'),
        firstName: Joi.string().alphanum().min(2).max(20).required(), // TODO: Force first Chracter uppercase
        lastName: Joi.string().alphanum().min(3).max(30).required(), // TODO: Force first Chracter uppercase
        dob: Joi.date(),
        phone: Joi.string().pattern(/^([+]?\d{1,2}[-\s]?|)\d{3}[-\s]?\d{3}[-\s]?\d{4}$/)
    })

    var value = {}
    value = await validateInput(schema, body)
    if (value.error === undefined) {
        body.username = body.username.toLowerCase()
        body.firstName = fnlib.capitalizeFirstLetter(body.firstName)
        body.lastName = fnlib.capitalizeFirstLetter(body.lastName)
    }
    
    return value
}

async function validateLoginBody(body) {
    const schema = Joi.object({
        email: Joi.string().email(),
        password: Joi.string().required().pattern(new RegExp('^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$'))
    })

    return await validateInput(schema, body)
}

async function validateUsername(username) {
    return await model.findUserByUsername(username)
}

async function validateEmail(email) {
    return await model.findUserByEmail(email)
}

function validatePasswords(body) {
    return body.password === body.passwordRepeat
}


/** REGISTER
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns response
 */
async function registerUser(req, res) {
    let response = obotix.responseTemplate()
    let passedValidation = true

    // check the body - perhaps the caller didn't include a JSON body
    if (req.body.username === undefined) {
        response.status = 400
        response.message = 'Invalid body content. Missing field requirements.'
        return response
    }

    const validInput = await validateRegisterBody(req.body)
    const validUsername = await validateUsername(req.body.username)
    const validEmail = await validateEmail(req.body.email)
    const validPasswords = validatePasswords(req.body)

    if (!validInput.username) {
        response.status = 400
        response.message = 'Invalid body content.'
        passedValidation = false
    }
    if (validEmail != null) { 
        response.status = 400
        response.message =  `Email (${req.body.email}) already exists.`
        passedValidation = false
    }
    if (validUsername != null) {
        response.status = 400
        response.message = `Username (${req.body.username}) already exists.`
        passedValidation = false
    }
    if (!validPasswords) {
        response.status = 400
        response.message =  'Password and password-repeat does not match.'
        passedValidation = false
    }

    if (passedValidation) {
        log.debug('before doc', req.body)
        delete req.body.passwordRepeat
        log.debug('adter doc', req.body)
        var userdoc = await model.createUser(req.body)
        if (userdoc._id) {
            response.data.user = userdoc
            res.header('x-auth-token', userdoc.generateAuthToken())
            log.info(`${req.username} | Account created.`)
        } else {
            response.status = 204
            response.message = `DB ERROR: ${userdoc}`
            log.error(response.message)
            console.log(response.message)
        }
    } 

    return response
}


/** LOGIN
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
// eslint-disable-next-line no-unused-vars
async function loginUser(req, res) {
    let response = obotix.responseTemplate()
    let passedValidation = true

    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress 
    log.info('Login IP: ', ip)

    const validInput = await validateLoginBody(req.body)

    if (!validInput.email) {
        response.status = 400
        response.message = `Invalid body content.  ${validInput}`
        passedValidation = false
    } 

    if (passedValidation) {
        var userdoc = await model.findUserByEmail(req.body.email)
        if (!userdoc) {
            response.status = 400
            response.message = 'Invalid email or password.'
            passedValidation = false
        }
    }

    if (passedValidation) {
        const validPassword = await bcrypt.compare(req.body.password, userdoc.password)
        if (!validPassword) {
            response.status = 400
            response.message = 'Invalid email or password.'
            passedValidation = false
        } else {
            res.header('x-auth-token', userdoc.generateAuthToken())
            response.data._id = userdoc._id
            response.data.role = userdoc.role
        }
    }

    return response
}

// eslint-disable-next-line no-unused-vars
function deleteUser(req, res) {
    let response = obotix.responseTemplate()
    model.deleteUser(req.body)
    return response
}

// eslint-disable-next-line no-unused-vars
function getProfile(req, res) {
    let response = obotix.responseTemplate()
    model.getUser(req.body)
    return response
}

// eslint-disable-next-line no-unused-vars
function updateProfile(req, res) {
    let response = obotix.responseTemplate()
    model.updateUser(req.body)
    return response
}

export default {
    init,
    getProfile,
    updateProfile,
    loginUser,
    registerUser,
    deleteUser
}
