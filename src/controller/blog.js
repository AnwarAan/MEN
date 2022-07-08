import {
    validationResult
} from 'express-validator';
import path, {
    dirname
} from 'path';
import {
    fileURLToPath
} from 'url';
import fs from 'fs';
import Blog from '../models/blog.js'

const __dirname = dirname(fileURLToPath(
    import.meta.url));

const createBlog = (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const err = new Error('Invalid Value');
        err.errorStatus = 400;
        err.data = errors.array();
        throw err
    }

    if (!req.file) {
        const err = new Error('Insert Image')
        err.status = 422;
        throw err;
    }


    const title = req.body.title;
    const body = req.body.body;
    const image = req.file.path;
    const timestamps = new Date();


    const addBlog = new Blog({
        title: title,
        body: body,
        image: image,
        author: {
            name: 'MCA',
            time: timestamps
        }
    });


    addBlog.save()
        .then(result => {
            res.status(201).json({
                message: 'Create Blog Success',
                data: result
            });
        })
        .catch(err => {
            console.log('err :', err)
        })
}

const readBlog = (req, res, next) => {
    const currentPage = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 5;
    let totalItem;


    Blog.find()
        .countDocuments()
        .then(count => {
            totalItem = count;
            return Blog.find()
                .skip((currentPage - 1) * perPage)
                .limit(perPage)
        })
        .then(result => {
            res.status(200).json({
                message: 'Success Get Blog',
                data: result,
                total_data: totalItem,
                show_page: perPage,
                current_page: currentPage
            })
        })
        .catch(err => {
            next(err);
        })

    // Blog.find()
    //     .then(result => {
    //         res.status(200).json({
    //             message: 'Success Get Blog Data',
    //             data: result
    //         })
    //     })
    //     .catch(err => {
    //         next(err)
    //     })
}

const readBlogById = (req, res, next) => {
    const blogId = req.params.id;
    Blog.findById(blogId)
        .then(result => {
            if (!result) {
                const error = new Error('Id Invalid');
                error.errorStatus = 404;
                throw error;
            }
            res.status(200).json({
                message: 'Data Valid',
                data: result
            });
        })
        .catch(err => {
            next(err)
        })
}

const updateBlog = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const err = new Error('Data Invalid');
        err.errorStatus = 400;
        err.data = errors.array();
        throw err;
    }

    const title = req.body.title;
    const image = req.file.path;
    const body = req.body.body
    const blogId = req.params.id;

    Blog.findById(blogId)
        .then(blog => {
            if (!blog) {
                const err = new Error('Id Invalid');
                err.errorStatus = 404;
                throw err;
            }
            blog.title = title;
            blog.image = image;
            blog.body = body;

            return blog.save();
        })
        .then(result => {
            res.status(200).json({
                message: 'Success Update Blog',
                data: result
            });
        })
        .catch(err => {
            next(err);
        })

}

const deleteBlog = (req, res, next) => {
    const blogId = req.params.id;
    Blog.findById(blogId)
        .then(blog => {
            if (!blog) {
                const error = new Error('Id Not Valid');
                error.errorStatus = 404;
                throw error;
            }

            removeImage(blog.image);
            return Blog.findByIdAndRemove(blogId)
        })
        .then(result => {
            res.status(200).json({
                message: 'Success Delete Blog',
                data: result
            })

        })
        .catch(err => {
            next(err)
        })
}

const removeImage = (filePath) => {
    console.log('filepath :', filePath);
    console.log('dirname:', __dirname);

    filePath = path.join(__dirname, '../..', filePath);
    fs.unlink(filePath, err => console.log(err));
}

export default {
    readBlog,
    readBlogById,
    createBlog,
    updateBlog,
    deleteBlog
}