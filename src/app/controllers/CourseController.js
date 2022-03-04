const Course = require('../models/Course');
const { multipleMongooseToObject, mongooseToObject } = require('../../utils/mongoose');
const { slugify } = require('../../utils/helpers');
class CourseController {
    //[GET] /courses/{slug}
    show(req, res, next) {
        let slug = req.params.slug;
        Course.findOne({ slug: slug })
            .then(function (course) {
                course = mongooseToObject(course);
                res.render('courses/show',{course});
            })
            .catch(next);
    }

    create(req, res) {
        res.render('courses/create', {
            message: {
                success: req.flash('success'),
                error: req.flash('error')
            }

        });
    }

    store(req, res, next) {
        Course.create([
            {
                name: req.body.name,
                description: req.body.description,
                image: req.body.image,
                slug: slugify(req.body.name)
            }
        ])
        .then(course => {
            req.flash('success', "Course created successfully.");
            res.redirect('back');
        })
        .catch(err => {
            req.flash('error', "Course created failed.");
            res.redirect('back');

        });

    }
}

module.exports = new CourseController();
