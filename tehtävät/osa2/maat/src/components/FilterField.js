import React from 'react';

const FilterField = ({app}) => {

    return (
        <div>

            <h2>Search</h2>

            <form>

                <div>
                    Name: <input value={app.state.filter} onChange={app.onFilterChange} />
                </div>

            </form>
        </div>
    )
}

export default FilterField