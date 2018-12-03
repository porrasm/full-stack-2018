import axios from 'axios'
const baseUrl = '/api/blogs'

let token

const setToken = (newToken) => {
  console.log("Setting token: ", newToken)
  token = `bearer ${newToken}`
}

const getAll = () => {

  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const addBlog = (blog) => {

  console.log("Trying to add blog: ", blog)

  const config = {headers: {Authorization: token}}

  const request = axios.post(baseUrl, blog, config)
  return request.then(response => response.data)
}

const updateBlog = async (id, blog) => {

  console.log("Trying to update blog: ", blog)

  const config = {headers: {Authorization: token}}

  const url = baseUrl + "/" + id

  const request = await axios.put(url, blog, config)
  return request.data
}

const deleteBlog = async (id) => {

  console.log("Trying to delete blog: ", id)

  const config = {headers: {Authorization: token}}

  const url = baseUrl + "/" + id

  const request = await axios.delete(url, config)
  return request.data
}

export default { getAll, addBlog, setToken, updateBlog, deleteBlog}