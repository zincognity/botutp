const mongoose = require('mongoose');

const registro = mongoose.Schema({
    _id: {
        type: Number,
        require: true
    },
    code: {
        type: String,
        require: true
    },
    nombres: {
        type: String,
        require: true
    },
    carrera: {
        type: String,
        require: true
    },
    sede: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    public: {
        type: Boolean,
        require: true
    }
});

const model = mongoose.model('Registrados', registro);

module.exports = model;