const actionFor = {
    createNew(anecdote) {
        return { type: "create", data: { anecdote } }
    },
    vote(id) {
        return { type: "vote", data: { id } }
    }
}

export default actionFor