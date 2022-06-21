import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const create = async (newBlog) => {
  const config = {
    headers: {Authorization: token}
  }
  const res = await axios.post(baseUrl, newBlog, config)
  return res.data
}

export const blogService = { getAll, create, setToken }