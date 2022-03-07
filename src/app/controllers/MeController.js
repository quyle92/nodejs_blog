const Course = require('../models/Course');
const { multipleMongooseToObject, mongooseToObject } = require('../../utils/mongoose')
class MeController {
    //[GET] /stored/courses
    async storedCourses(req, res, next) {
        let courses = await Course.find();
        try {
            courses = multipleMongooseToObject(courses);
            res.render('me/stored-courses', {
                courses,
                message: {
                    success: req.flash('success'),
                    error: req.flash('error')
                }
            });
        } catch (error) {
            next(next)
        }
    }

    async trashCourses(req, res, next) {
        let courses = await Course.findDeleted();

        try {
            courses = multipleMongooseToObject(courses);
            res.render('me/trash-courses', {
                courses,
                message: {
                    success: req.flash('success'),
                    error: req.flash('error')
                }
            });
        } catch (error) {
            next(next)
        }
    }


}

module.exports = new MeController();
