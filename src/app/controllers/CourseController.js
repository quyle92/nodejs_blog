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
            next(err);
            req.flash('error', "Course created failed.");
            res.redirect('back');
        });

    }

    edit(req, res, next) {
        res.render('courses/edit', {
            message: {
                success: req.flash('success'),
                error: req.flash('error')
            }
        });
    }

    async getCourse(req, res, next) {
        let course = await Course.findById(req.params.id);
        try {
            course = mongooseToObject(course);
            res.render('courses/edit', {
                course,
                message: {
                    success: req.flash('success'),
                    error: req.flash('error')
                }
            });
        } catch (error) {
            next(next)
        }
    }

    async update(req, res, next) {
        // res.json(req.body)
        try {
            const filter = { _id: req.params.id };
            const data = req.body;
            data['slug'] = slugify(req.body.name)
            const doc = await Course.findOneAndUpdate(filter, data, {
                new: true
            });
            req.flash('success', "Course updated successfully.");
            res.redirect('back');
        } catch (error) {
            next(error);
            req.flash('error', "Course updated failed.");
            res.redirect('back');
        }

    }

    async softDelete(req, res, next) {
        try {
            const deletedCount = await Course.delete({ _id: req.params.id });
            req.flash('success', "Course deleted successfully.");
            res.redirect('back');
        } catch (error) {
            next(error);
            req.flash('error', "Course deleted failed.");
            res.redirect('back');
        }
    }

    async destroy(req, res, next) {
        try {
            const deletedCount = await Course.deleteOne({ _id: req.params.id });
            // console.log(deletedCount)
            req.flash('success', "Course deleted successfully.");
            res.redirect('back');
        } catch (error) {
            next(error);
            req.flash('error', "Course deleted failed.");
            res.redirect('back');
        }
    }

    async restore(req, res, next) {
        const course = await Course.findOneWithDeleted({ _id: req.params.id });
        try {
            course.restore().then((course) => {
                req.flash('success', "Course restored successfully.");
                res.redirect('back');
            });
        } catch (error) {
            next(error);
            req.flash('error', "Course restored failed.");
            res.redirect('back');
        }
    }
}

module.exports = new CourseController();
