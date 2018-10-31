import React from 'react';

const CountryList = ({countries, filter, click}) => {

    const filtered = countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))

    console.log("Filtered amount: ", filtered.length)

    if (filtered.length >= 10) {
        return (
            <div>
                <h2>Results</h2>
                <p>Please specify a more accurate keyword.</p>
            </div>
        )
    } else if (filtered.length === 1) {
        return (
            <SingleCountry country={filtered[0]} />
        )
    } else if (filtered.length === 0) {
        return (
            <div>
                <h2>Results</h2>
                <p>No results found</p>
            </div>
        )
    }

    return (
        <div>
            <h2>Results</h2>
            <p>These countries match your search.</p>

            <List click={click} countries={filtered} />

        </div>
    )
}

const List = ({click, countries}) => {

    const elements = countries.map(country => <li key={country.name} onClick={ () => click(country.name)}>{country.name}</li>)

    return (
        <ul>
            {elements}
        </ul>
    )
}

const SingleCountry = ({country}) => {

    return (
        <div>
            <h2>{country.name}</h2>
            <p>Capital: {country.capital}</p>
            <p>Population: {country.population}</p>
            <img src={country.flag} alt="Flag" width="256" height="144" border="2"></img>
        </div>
    )
}

export default CountryList