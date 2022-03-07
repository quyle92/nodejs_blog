const express = require('express');
const router = express.Router();
const courseController = require('../app/controllers/CourseController');

router.get('/create', courseController.create);
router.post('/store', courseController.store);
router.get('/:id/edit', courseController.getCourse);
router.patch('/:id/restore', courseController.restore);
router.patch('/:id/softDelete', courseController.softDelete);
router.patch('/:id', courseController.update);
router.delete('/:id', courseController.destroy);
router.get('/:slug', courseController.show);

module.exports = router;
