import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import morgan from 'morgan';
import multer from 'multer';
import path, {
    dirname
} from 'path';
import {
    fileURLToPath
} from 'url';
import productRouter from './src/routes/products.js';
import authRouter from './src/routes/auth.js'
import blogRouter from './src/routes/blog.js'
import config from './src/config/config.js';


const app = express();
const port = process.env.DB_PORT;
const __dirname = dirname(fileURLToPath(
    import.meta.url));
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {

        const unix = Date.now();
        cb(null, unix + '-' + file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        cb(null, true)
    }
}



mongoose.connect(`mongodb+srv://${config.USER}:${config.PASSWORD}@${config.HOST}`)


app.use(bodyParser.urlencoded({
    extended: true
}));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(multer({
    storage: fileStorage,
    fileFilter: fileFilter
}).single('image'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use('/v1', productRouter)
app.use('/v1', authRouter);
app.use('/v1', blogRouter);
app.use((error, req, res, next) => {
    const status = error.errorStatus || 500;
    const message = error.message;
    const data = error.data;

    console.log(status);
    console.log(message);
    console.log(data);

    res.status(status).json({
        message: message,
        data: data
    });
    next();
});


app.listen(port, () => {
    console.log(`Server is Running on port: ${port}`);
});