/* eslint-disable no-undef */
import React from 'react'
import { filterChange } from '../reducers/filterReducer'

class Notification extends React.Component {

    componentDidMount() {

        const store = this.props.store
        console.log('TEST')

        this.unsubscribe = store.subscribe(() =>
            this.forceUpdate()
        )
    }
    componentWillUnmount() {
        this.unsubscribe()
    }

    render() {

        const value = this.props.store.getState().filter

        return (
            <div>Filter: <input name='filterInput' value={value} onChange={this.updateFilter} /> </div>
        )
    }

    updateFilter = (event) => {

        console.log('filter cahnge')

        event.preventDefault()
        const filter = event.target.value

        this.props.store.dispatch(filterChange(filter))
    }
}

export default Notification