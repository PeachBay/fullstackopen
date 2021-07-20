import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Search from './components/Search'
import CountryList from './components/CountryList'

const App = () => {

  const [countries, setCountries] = useState([])
  const [filterQuery, setFilterQuery] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [fetched, setFetched] = useState(false)

  // fetch data from restcountries API
  useEffect(() => {
    console.log('in effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
        setFilterQuery(response.data)
        setFetched(true)
      }).catch(error => {
        console.log(error)
      })
  }, [])

  //onChange 
  const searchCountry = (event) => {
    // add user input in searchQuery var
    setSearchQuery(event.target.value)
    // add a copy array of country filtered by the user input
    setFilterQuery(countries.filter(query => query.name.toLowerCase().includes(event.target.value.toLowerCase())))
  }

  return (
    <div>
      <Search 
        value={searchQuery}
        handleChange={searchCountry}
      />

      <CountryList
        data={filterQuery} 
        fetched={fetched}
        setFilterQuery={setFilterQuery}
      />
      
    </div>
  )
}

export default App;
