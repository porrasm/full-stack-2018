import React from 'react'
const Blog = ({blog}) => (
  <div>
    {blog.title} {blog.author}
  </div>  
)

const BlogForm = ({app}) => (
  
  <div>
    
    <form onSubmit={app.addBlog}>
    
      <div>
        Title
          <input
            type="text"
            name="title"
            value={app.state.newBlog.title}
            onChange={app.blogFieldChange}
          />
      </div>

      <div>
        Author
          <input
            type="text"
            name="author"
            value={app.state.newBlog.author}
            onChange={app.blogFieldChange}
          />
      </div>

      <div>
        URL
          <input
            type="text"
            name="url"
            value={app.state.newBlog.url}
            onChange={app.blogFieldChange}
          />
      </div>
      <button type="submit">Submit</button>
    </form>

  </div>  
)

export default {Blog, BlogForm}