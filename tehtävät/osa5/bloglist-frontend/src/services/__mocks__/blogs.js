let token = null

const blogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 16,
        __v: 0,
        user: {
            _id: "5bf9a0d2daef303b10f356e2",
            username: "root",
            name: "real name"
        }
    },
    {
        _id: "5c0409c967bdd4315cb1dc8a",
        title: "title",
        author: "author",
        url: "url",
        user: {
            _id: "5bf9a0d2daef303b10f356e2",
            username: "root",
            name: "real name"
        },
        likes: 8,
        __v: 0
    },
    {
        _id: "5c0409f667bdd4315cb1dc8b",
        title: "asd",
        author: "123",
        url: "asdasd",
        user: {
            _id: "5bf9a0d2daef303b10f356e2",
            username: "root",
            name: "real name"
        },
        likes: 50,
        __v: 0
    },
    {
        _id: "5c0527b0376bb110809f2ca0",
        title: "Isi on urpo",
        author: "Eetu Ikonen",
        url: "www.isiurpo.net",
        user: {
            _id: "5bf9a0d2daef303b10f356e2",
            username: "root",
            name: "real name"
        },
        likes: 8,
        __v: 0
    },
    {
        _id: "TEST ID",
        title: "TEST TITLE",
        author: "TEST AUTHOR",
        url: "TEST URL",
        user: {
            _id: "TEST USER ID",
            username: "TEST USERAME",
            name: "TEST REAL NAME"
        },
        likes: 8,
        __v: 0
    }
]

const getAll = () => {
    return Promise.resolve(blogs)
}

const setToken = (token) => {

}

export default { getAll, blogs, setToken }