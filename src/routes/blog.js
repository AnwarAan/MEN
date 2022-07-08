import express from 'express';
import {
    body
} from 'express-validator';
import blogController from '../controller/blog.js'


const router = express.Router();


router.get('/blog', blogController.readBlog)
router.get('/blog/:id', blogController.readBlogById)
router.post('/blog', [body('title').isLength({
    min: 2
}).withMessage('input not valid'), body('body').isLength({
    min: 5
}).withMessage('input not valid')], blogController.createBlog)

router.put('/blog/:id', [body('title').isLength({
    min: 2
}).withMessage('input not valid'), body('body').isLength({
    min: 5
}).withMessage('input not valid')], blogController.updateBlog)
router.delete('/blog/:id', blogController.deleteBlog)

export default router;