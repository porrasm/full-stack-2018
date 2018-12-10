import axios from 'axios'
const url = 'http://localhost:3001/anecdotes'


const getId = () => (100000 * Math.random()).toFixed(0)
const asObject = (anecdote) => {
    return {
        content: anecdote,
        id: getId(),
        votes: 0
    }
}

const getAll = async () => {
    const response = await axios.get(url)
    return response.data
}

const createNew = async (anecdote) => {

    console.log('SERVICE: CREATING ANECDOTE OBJECT FROM: ', anecdote)
    const response = await axios.post(url, asObject(anecdote))
    return response.data
}

const update = async (anecdoteObject) => {

    const putUrl = url + '/' + anecdoteObject.id

    const response = await axios.put(putUrl, anecdoteObject)
    return response.data
}

export default { getAll, createNew, update }