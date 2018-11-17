const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {

    let likes = 0

    blogs.forEach(blog => {
        likes += blog.likes
    });
    return likes
}

const favoriteBlog = (blogs) => {

    let best = blogs[0]

    for (let i = 1; i < blogs.length; i++) {
        if (blogs[i].likes > best.likes) {
            best = blogs[i]
        }
    }
    return best
}

const mostBlogs = (blogs) => {

    if (blogs.length === 0) {
        return undefined
    }

    let authors

    blogs.forEach(blog => {
        authors = addAuthorOrRaiseBlogAmount(authors, blog.author)
    });

    let author = authors[0]

    for (let i = 0; i < authors.length; i++) {
        if (authors[i].blogs > author.blogs) {
            author = authors[i]
        } 
    }

    return author
}

const addAuthorOrRaiseBlogAmount = (authors, authorName) => {

    if (authors === undefined) {
        return [{author: authorName, blogs: 1}]
    }

    let found = false

    for (let i = 0; i < authors.length; i++) {
        if (authors[i].author === authorName) {

            authors[i].blogs += 1

            found = true
            break
        }
    }

    if (!found) {
        return authors.concat({author: authorName, blogs: 1})
    }
    return authors
}

const mostLikes = (blogs) => {

    if (blogs.length === 0) {
        return undefined
    }

    let authors

    blogs.forEach(blog => {
        authors = addAuthorOrRaiseLikeAmount(authors, blog)
    });

    let author = authors[0]

    for (let i = 0; i < authors.length; i++) {
        if (authors[i].likes > author.likes) {
            author = authors[i]
        } 
    }

    return author
}

const addAuthorOrRaiseLikeAmount = (authors, blog) => {

    if (authors === undefined) {
        return [{author: blog.author, likes: blog.likes}]
    }

    let found = false

    for (let i = 0; i < authors.length; i++) {
        if (authors[i].author === blog.author) {

            authors[i].likes += blog.likes

            found = true
            break
        }
    }

    if (!found) {
        return authors.concat({author: blog.author, likes: blog.likes})
    }
    return authors
}

module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}