const UserModel = require('../DB/models/user.model')

async function getUsers() {
    try {
        const users = await UserModel.find()
        return users
    } catch (err) {
        console.log(err.message)
    }
}
async function getUser(id) {
    try {
        const user = await UserModel.findOne({ _id: id })
        return user
    } catch (err) {
        console.log(err.message)
    }
}

async function postUser(userData) {
    try {
        const user = await UserModel.create(userData)
        return user
    } catch (err) {
        console.log(err.message)
    }
}

async function deleteUser(id) {
    try {
        const user = await UserModel.deleteOne({ _id: id })
        return user
    } catch (err) {
        console.log(err.message)
    }
}

async function patchUser(id, userData) {
    try {
        const user = await UserModel.findOneAndUpdate({ _id: id }, userData)
        return user
    } catch (err) {
        console.log(err.message)
    }
}

module.exports = {
    getUsers,
    getUser,
    postUser,
    patchUser,
    deleteUser,
}
