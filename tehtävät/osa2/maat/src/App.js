import React, { Component } from 'react';
import axios from 'axios';
import CountryList from './components/CountryList';
import FilterField from './components/FilterField';

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      filter: '',
      countries: []
    }

  }

  componentDidMount() {

    console.log("Did mount.")

    axios.get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log("Server responded: ", response)

        this.setState({ countries: response.data })
      })

  }

  onCountryClick = (country) => {
    console.log("Clicked country: ", country)
    this.setState({filter: country})
  }

  onFilterChange = (event) => {
    console.log('Updated filter.')

    this.setState({ filter: event.target.value })
  }

  render() {
    return (
      <div>

        <h1>Country list</h1>

        <FilterField app={this} />
        <CountryList countries={this.state.countries} filter={this.state.filter} click={this.onCountryClick} />

      </div>
    );
  }
}

export default App;
