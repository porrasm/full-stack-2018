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

    return async (dispacth) =>{
        const newBlog = await blogs.create(blog)
        dispacth({
            type: 'blog-create',
            data: newBlog
        })
    }
}
export const voteBlogAction = (id, blog) => {

    return async (dispacth) =>{
        const newBlog = await blogs.update(id, blog)
        dispacth({
            type: 'blog-update',
            data: newBlog
        })
    }
}
export const deleteBlogAction = (id) => {

    return async (dispatch) =>{
        const newBlog = await blogs.remove(id)
        dispatch({
            type: 'blog-delete',
            data: id
        })
    }
}
export const initBlogs = (blogs) => {

    return async (dispacth) =>{
        dispacth({
            type: 'blog-init',
            data: blogs
        })
    }
}


export default blogReducer