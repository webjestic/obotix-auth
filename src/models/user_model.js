
import obotix from 'obotix'
import { Schema } from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

var log = undefined
var mongoose = undefined

var userSchema = undefined
var User = undefined

function initModel() {
    if (User === undefined) {
        log = obotix.getLogger('auth:user')
        mongoose = obotix.mongo.mongoose
        userSchema = new Schema({ any: Schema.Types.Mixed }, { strict: false })
        userSchema.methods.generateAuthToken = function() { 
            // JWT Sign: https://www.npmjs.com/package/jsonwebtoken
            const token = jwt.sign({ _id: this._id, email: this.email }, process.env.OAPI_JWT_KEY)
            return token
        }
        User = mongoose.model('User', userSchema)
        log.info(`${obotix.getConfig().CONFIG_APP} user model loaded.`)
    }
}


// eslint-disable-next-line no-unused-vars
async function createUser(body) {
    var result = ''
    const salt = await bcrypt.genSalt(10)
    body.password = await bcrypt.hash(body.password, salt)
    body.role = obotix.getConfig().roles.basic
    let user = new User(body)
    try {
        result = await user.save()
        result.password = '*****'
    } catch (error) {
        log.debug('save:error', error)
        result = error.message
    }
    return result
}

// eslint-disable-next-line no-unused-vars
async function findUserById(uid) {
    return await User.findUserById(uid).exec()
}

async function findUserByEmail(email) {
    return await User.findOne({ 'email': email }).exec()
}

async function findUserByUsername(username) {
    return await User.findOne({ 'username': username }).exec()
}

// eslint-disable-next-line no-unused-vars
function getUser(data) {

}

// eslint-disable-next-line no-unused-vars
function loginUser(data) {

}

// eslint-disable-next-line no-unused-vars
function updateUser(data) {

}

// eslint-disable-next-line no-unused-vars
function deleteUser(data) {

}

export default {
    initModel,
    createUser,
    findUserById,
    findUserByEmail,
    findUserByUsername,
    getUser,
    loginUser,
    updateUser,
    deleteUser
}
