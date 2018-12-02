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

  console.log("with config: ", config)
  console.log("with token: ", token)

  const request = axios.post(baseUrl, blog, config)
  return request.then(response => response.data)
}

export default { getAll, addBlog, setToken}