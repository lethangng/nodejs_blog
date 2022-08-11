const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Course = new Schema(
  {
    // require: true: Nghĩa là bắt buộc phải nhập
    name: {type: String, require: true},
    description: String,
    image: String,
    videoId: {type: String, require: true},
    level: String,
    // unique: chỉ cho phép tồn tại duy nhất 1 cái
    deletedAt: {},
    slug: { type: String, slug: 'name', unique: true },
  },
  {
    timestamps: true,
  }
);

// Add plugins
mongoose.plugin(slug);
Course.plugin(mongooseDelete, { overrideMethods: 'all' });

module.exports = mongoose.model('Course', Course);
