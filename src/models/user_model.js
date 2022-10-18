
import obotix from 'obotix'
import { Schema } from 'mongoose'
import jwt from 'jsonwebtoken'

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
            log.debug('_id:', this._id)
            log.debug('role:', this.role)
            log.debug('jwt:', token)
            return token
        }
        User = mongoose.model('User', userSchema)
        log.info(`${obotix.getConfig().CONFIG_APP} user model loaded.`)
    }
}


// eslint-disable-next-line no-unused-vars
function createUser(data) {

}

// eslint-disable-next-line no-unused-vars
function findUserById(uid) {

}

// eslint-disable-next-line no-unused-vars
function findUserByEmail(email) {

}

// eslint-disable-next-line no-unused-vars
function findUserByName(fname, lname) {

}

// eslint-disable-next-line no-unused-vars
function loginUser(email, password) {

}

// eslint-disable-next-line no-unused-vars
function updateUser(data) {

}

function deleteUser() {

}


export default {
    User,
    initModel,
    createUser,
    findUserById,
    findUserByEmail,
    findUserByName,
    loginUser,
    updateUser,
    deleteUser
}
