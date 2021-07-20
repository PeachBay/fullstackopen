import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({data}) => {
  const {languages, name, capital, population, flag} = data
  console.log(languages)

  const [weather, setWeather] = useState({
    current: {
      temperature: '',
      weather_icons: '',
      weather_descriptions: ''
    }
  })

  // fetch data from restcountries API
  useEffect(() => {
    console.log('in useeffect')

    const api_key = process.env.REACT_APP_WEATHER_API
    const params = {
      access_key: api_key,
      query: {capital},
      units: 'm'
    }
    axios
      .get('http://api.weatherstack.com/current', {params})
      .then(response => {
        setWeather(response.data)
      }).catch(error => {
        console.log(error)
      })
    }, [capital])

  console.log(weather)

	return (
		<div>
      <h1>{name}</h1>
      <p>capital {capital}</p>
      <p>population {population}</p>

      <h2>languages</h2>
      <ul>
        {languages.map((language, i) => <li key={i}>{language.name}</li>)}
      </ul>

      <img src={flag} alt={name} width='260'></img>

      <h2>Weather in {capital}</h2>
      
      <p>temperature: {weather.current.temperature}</p>
      <img src={weather.current.weather_icons} alt={weather.current.weather_descriptions}></img>
		</div>
	)
}

export default Country