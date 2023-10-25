const CatModel = require('../DB/models/cat.model')

async function getCats() {
    try {
        const cats = await CatModel.find()
        return cats
    } catch (err) {
        console.log(err.message)
    }
}
async function getCat(id) {
    try {
        const cat = await CatModel.findOne({ _id: id })
        return cat
    } catch (err) {
        console.log(err.message)
    }
}

async function postCat(catData) {
    try {
        const cat = await CatModel.create(catData)
        return cat
    } catch (err) {
        console.log(err.message)
    }
}

async function deleteCat(id) {
    try {
        const cat = await CatModel.deleteOne({ _id: id })
        return cat
    } catch (err) {
        console.log(err.message)
    }
}

async function patchCat(id, catData) {
    try {
        const cat = await CatModel.findOneAndUpdate({ _id: id }, catData)
        return cat
    } catch (err) {
        console.log(err.message)
    }
}

module.exports = {
    getCats,
    getCat,
    postCat,
    patchCat,
    deleteCat,
}
