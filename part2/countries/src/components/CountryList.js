import React from 'react'
import Country from './Country'

const CountryList = ({fetched, data, setFilterQuery}) => {
  if (!fetched) {
    return (
      <p>Fetching data</p>
    )
  }

  if (data.length > 10) {
		return (
		  <p>
			  Too many matches, specify another filter
		  </p>
		)
  } else if (data.length >= 2 & data.length <= 10) {
    return (
      <div>
        <ul>
          {data.map((country, i) => <li key={i}>{country.name}
          <button onClick={() => setFilterQuery([country])}>show</button></li>)}
        </ul>
      </div>
    )
  } else {
    console.log(data)
    return(
      <Country data={data[0]} />
    )
  }
}

export default CountryList