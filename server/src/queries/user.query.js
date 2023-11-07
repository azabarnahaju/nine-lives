const UserModel = require('../DB/models/user.model');
const { isValidObjectId } = require('mongoose');

// @desc    Get users
// @route   GET /api/v1/users
async function getUsers(req, res) {
    try {
        const users = await UserModel.find();
        if (!users) {
            res.status(400);
            throw new Error('Server error');
        } else {
            res.status(200).json(users);
        }
    } catch (err) {
        res.json(err.message);
    }
}

// @desc    Get user
// @route   GET /api/v1/users/:id
async function getUser(req, res) {
    const id = req.params.id;
    try {
        const user = await UserModel.findOne({ _id: id });
        if (!user) {
            res.status(404);
            throw new Error('User not found!');
        } else {
            res.status(200).json(user);
        }
    } catch (err) {
        res.json(err.message);
    }
}

// @desc    Register user
// @route   POST /api/v1/users
async function postUser(req, res) {
    const { username, email, password } = req.body;
    try {
        const user = await UserModel.create({ username, email, password });
        if (user) {
            return res.status(201).json(user);
        } else {
            res.status(400);
            throw new Error('Invalid user data');
        }
    } catch (err) {
        res.json(err.message);
    }
}

// @desc    Delete user
// @route   DELETE /api/v1/users/:id
async function deleteUser(req, res) {
    const id = req.params.id;
    try {
        if (!isValidObjectId(id)) {
            res.status(400);
            throw new Error('Not a valid id');
        }
        const user = await UserModel.deleteOne({ _id: id });
        if (user) {
            return res.status(200).json(user);
        } else {
            res.status(500);
            throw new Error('Internal server error');
        }
    } catch (err) {
        res.json(err.message);
    }
}
// @desc    Update user
// @route   PATCH /api/v1/users/:id
async function patchUser(req, res) {
    const id = req.params.userId;
    console.log(id);
    console.log(req.body);
    const { username, email, password, cats } = req.body;
    try {
        if (!isValidObjectId(id)) {
            res.status(400);
            throw new Error('Not a valid id');
        }
        const user = await UserModel.findOneAndUpdate(
            { _id: id },
            { $set: { username: username, email: email, password: password } },
            { new: true }
        );
        if (cats) {
            await UserModel.findOneAndUpdate(
                { _id: id },
                {
                    $push: {
                        cats: cats,
                    },
                }
            );
        }
        if (user) {
            return res.status(200).json(user);
        } else {
            res.status(400);
            throw new Error('Invalid user data');
        }
    } catch (err) {
        res.json(err.message);
    }
}

module.exports = {
    getUsers,
    getUser,
    postUser,
    patchUser,
    deleteUser,
};
