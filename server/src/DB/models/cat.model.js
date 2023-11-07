const mongoose = require('mongoose');

const CatSchema = mongoose.Schema({
    name: String,
    birth: Date,
    breed: String,
    color: String,
    fav_toy: String,
    curr_vacc: Boolean,
    //lastvacc
    images: [
        {
            type: String,
        },
    ],
    last_visit: Date,
    health_rec: [
        {
            date: Date,
            symptoms: Array,
            result: String,
            comment: String,
        },
    ],
    vet_visit: [
        {
            date: Date,
            symptoms: Array,
            result: String,
            comment: String,
        },
    ],
    vaccination: [
        { get_date: Date, name: String, exp_date: Date, comment: String },
    ],
});

const CatModel = mongoose.model('Cat', CatSchema);

module.exports = CatModel;
