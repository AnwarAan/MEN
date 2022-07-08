import mongoose from 'mongoose';


const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    body: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    author: {
        type: Object,
        require: true
    }
}, {
    timestamps: true
})

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;