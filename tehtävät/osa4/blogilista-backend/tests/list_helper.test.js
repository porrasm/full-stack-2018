const listHelper = require('../utils/list_helper')

const blog = [
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
      }
]
const blogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    },
    {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      __v: 0
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      __v: 0
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0
    }  
  ]
const mostBlogs = {author: 'Robert C. Martin', blogs: 3}

describe.skip('list helper:', () => {

    test('dummy is called', () => {
        const blogs = []
      
        const result = listHelper.dummy(blogs)
        expect(result).toBe(1)
      })
      
      describe('total likes', () => {
          
          test('when array has no elements', () => {
              const result = listHelper.totalLikes([])
              expect(result).toBe(0)
          }) 
          test('when array has 1 element', () => {
              const result = listHelper.totalLikes(blog)
              expect(result).toBe(12)
          })
          test('when array has n amount of elements', () => {
              const result = listHelper.totalLikes(blogs)
              expect(result).toBe(36)
          })
      })
      
      describe('favorite blog', () => {
      
          test('returns undefined if array is empty', () => {
      
              const result = listHelper.favoriteBlog([])
          
              expect(result).toEqual(undefined)
          })
      
          test('returns the only element if the array length is 1', () => {
      
              const result = listHelper.favoriteBlog(blog)
          
              expect(result).toEqual(blog[0])
          })
          
          test('returns the blog with most likes if array length is n', () => {
      
              const result = listHelper.favoriteBlog(blogs)
          
              expect(result).toEqual(blog[0])
          })
      })
      
      describe('most blogs', () => {
      
          test('returns undefined if array is empty', () => {
              const result = listHelper.mostBlogs([])
          
              expect(result).toEqual(undefined)
          })
      
          test('returns the only author if the array length is 1', () => {
              const result = listHelper.mostBlogs(blog)
              const expected = {author: blog[0].author, blogs: 1}
          
              expect(result).toEqual(expected)
          })
      
          test('returns the author with most blogs if the array length is n', () => {
              const result = listHelper.mostBlogs(blogs)
          
              expect(result).toEqual(mostBlogs)
          })
      })
      
      describe('most likes', () => {
      
          test('returns undefined if array is empty', () => {
              const result = listHelper.mostLikes([])
          
              expect(result).toEqual(undefined)
          })
      
          test('returns the only author if the array length is 1', () => {
              const result = listHelper.mostLikes(blog)
              const expected = {author: blog[0].author, likes: 12}
          
              expect(result).toEqual(expected)
          })
      
          test('returns the author with most blogs if the array length is n', () => {
              const result = listHelper.mostLikes(blogs)
              const expected = {author: "Edsger W. Dijkstra", likes: 17}
      
              expect(result).toEqual(expected)
          })
      })
})

