const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Course = new Schema({
    name: { type: String, default: '', maxLength: 255, required: true},
    description: String,
    image: String,
    slug: { type: String, slug: "title", index: { unique: true } }
},{ timestamps: true});

//Plugins
mongoose.plugin(slug);
Course.plugin(mongooseDelete, { deletedAt: true, deletedBy: true });
Course.plugin(mongooseDelete, { overrideMethods: true });

module.exports = mongoose.model('Course', Course);