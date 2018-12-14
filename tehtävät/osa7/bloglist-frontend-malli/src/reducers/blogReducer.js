import blogs from '../services/blogs'

const blogReducer = (state = [], action) => {

    switch (action.type) {
        case 'blog-create':
            return state.concat(action.data)
        case 'blog-update':
            return updateBlog(state, action.data)
        case 'blog-delete':
            return deleteBlog(state, action.data)
        case 'blog-init':
            return action.data
        default:
            return state
    }
}

const updateBlog = (state, blog) => {
    return state.filter(b => b._id !== blog._id).concat(blog)
}
const deleteBlog = (state, id) => {
    return state.filter(b => b._id !== id)
}


export const createBlogAction = (blog) => {

    console.log('Creating blog from action: ', blog)

    return async (dispacth) =>{
        const newBlog = await blogs.create(blog)
        console.log('Created new blog from action: ', newBlog)
        dispacth({
            type: 'blog-create',
            data: newBlog
        })
    }
}
export const voteBlogAction = (id, blog) => {

    console.log('Updating blog from action: ', blog)

    return async (dispacth) =>{
        const newBlog = await blogs.update(id, blog)
        console.log('Updated new blog from action: ', newBlog)
        dispacth({
            type: 'blog-update',
            data: newBlog
        })
    }
}
export const deleteBlogAction = (id) => {

    console.log('Deleting blog from action: ', id)

    return async (dispacth) =>{
        const newBlog = await blogs.remove(id)
        console.log('Deleted new blog from action: ', newBlog)
        dispacth({
            type: 'blog-delete',
            data: id
        })
    }
}
export const initBlogs = (blogs) => {

    console.log('Initializing blogs from action: ', blogs)

    return async (dispacth) =>{
        dispacth({
            type: 'blog-init',
            data: blogs
        })
    }
}


export default blogReducer