/* eslint-disable no-undef */
import React from 'react'
import { connect } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'

class Filter extends React.Component {

    render() {

        const value = this.props.filter

        return (
            <div>Filter: <input name='filterInput' value={value} onChange={this.updateFilter} /> </div>
        )
    }

    updateFilter = (event) => {

        console.log('filter cahnge')

        event.preventDefault()
        const filter = event.target.value

        this.props.filterChange(filter)
    }
}

const mapStateToProps = (state) => {
    return {
        filter: state.filter
    }
}
const mapDispatchToProps = {
    filterChange
}

const ConnectedFilter = connect(
    mapStateToProps,
    mapDispatchToProps
)(Filter)

export default ConnectedFilter