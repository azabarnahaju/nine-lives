const CatModel = require('../DB/models/cat.model');
const { isValidObjectId } = require('mongoose');

// @desc    Get cats
// @route   GET /api/v1/cats
async function getCats(req, res) {
    try {
        const cats = await CatModel.find();
        if (!cats) {
            res.status(400);
            throw new Error('Server error');
        } else {
            res.status(200).json(cats);
        }
    } catch (err) {
        res.json(err.message);
    }
}

// @desc    Get cat
// @route   GET /api/v1/cats/:catId
async function getCat(req, res) {
    const id = req.params.catId;
    try {
        if (!isValidObjectId(id)) {
            res.status(400);
            throw new Error('Not a valid id');
        }
        const cat = await CatModel.findOne({ _id: id });
        if (!cat) {
            res.status(404);
            throw new Error('Cat not found!');
        } else {
            res.status(200).json(cat);
        }
    } catch (err) {
        res.json(err.message);
    }
}

// @desc    Register cat
// @route   POST /api/v1/cats
async function postCat(req, res) {
    const {
        name,
        birth,
        breed,
        color,
        fav_toy,
        curr_vacc,
        last_visit,
        health_rec,
        vet_visit,
        vaccination,
    } = req.body;
    try {
        const cat = await CatModel.create({
            name,
            birth,
            breed,
            color,
            fav_toy,
            curr_vacc,
            last_visit,
            health_rec,
            vet_visit,
            vaccination,
        });
        if (cat) {
            return res.status(201).json(cat);
        } else {
            res.status(400);
            throw new Error('Invalid cat data');
        }
    } catch (err) {
        res.json(err.message);
    }
}

// @desc    Delete cat
// @route   DELETE /api/v1/cats/:catId
async function deleteCat(req, res) {
    const id = req.params.catId;
    try {
        if (!isValidObjectId(id)) {
            res.status(400);
            throw new Error('Not a valid id');
        }
        const cat = await CatModel.deleteOne({ _id: id });
        if (cat) {
            return res.status(200).json(cat);
        } else {
            res.status(500);
            throw new Error('Internal server error');
        }
    } catch (err) {
        res.json(err.message);
    }
}

// @desc    Update cat
// @route   PATCH /api/v1/cats/:catId
async function patchCat(req, res) {
    const id = req.params.id;
    const {
        name,
        birth,
        breed,
        color,
        fav_toy,
        curr_vacc,
        last_visit,
        health_rec,
        vet_visit,
        vaccination,
    } = req.body;
    try {
        if (!isValidObjectId(id)) {
            res.status(400);
            throw new Error('Not a valid id');
        }
        const cat = await CatModel.findOneAndUpdate(
            { _id: id },
            {
                $set: {
                    name: name,
                    birth: birth,
                    breed: breed,
                    color: color,
                    fav_toy: fav_toy,
                    curr_vacc: curr_vacc,
                    last_visit: last_visit,
                },
            },
            { new: true }
        );
        if (health_rec) {
            await UserModel.findOneAndUpdate(
                { _id: id },
                {
                    $push: {
                        health_rec: health_rec,
                    },
                }
            );
        }
        if (vet_visit) {
            await UserModel.findOneAndUpdate(
                { _id: id },
                {
                    $push: {
                        vet_visit: vet_visit,
                    },
                }
            );
        }
        if (vaccination) {
            await UserModel.findOneAndUpdate(
                { _id: id },
                {
                    $push: {
                        vaccination: vaccination,
                    },
                }
            );
        }
        if (cat) {
            return res.status(200).json(cat);
        } else {
            res.status(400);
            throw new Error('Invalid cat data');
        }
    } catch (err) {
        res.json(err.message);
    }
}

module.exports = {
    getCats,
    getCat,
    postCat,
    patchCat,
    deleteCat,
};
