const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);
const Schema = mongoose.Schema;

const Course = new Schema({
    name: { type: String, default: '', maxLength: 255, required: true},
    description: String,
    image: String,
    // slug: { type: String, index: { unique: true} },
    slug: { type: String, slug: "title", index: { unique: true } }
},{ timestamps: true});

module.exports = mongoose.model('Course', Course);