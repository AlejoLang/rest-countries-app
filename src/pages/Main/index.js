import Header from 'components/Header'
import ListedCountries from 'components/ListedCountry'
import React, { useEffect, useState } from 'react'
import './styles.css'

function MainPage() {

  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then(res => res.json())
      .then(data => {setCountries(data); setFilteredCountries(data)})
  }, [])


  const searchCountry = (e) => {
    e.preventDefault()

    setFilteredCountries(countries.filter(
      con => con.name.common.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1
    ))
  }

  if(countries.length === 0){
    return(
      <div>
        Loding...
      </div>
    )
  }

  return (
    <div className='mainPage'>
      <Header />
      <div className='searchDiv' >
          <input type="text" className='searchBar'onChange={searchCountry} placeholder='Type a country name...'/>
      </div>
      <div className='flagsDiv'>
      {
      filteredCountries.map(country => 
          <ListedCountries data={country} />
      )}
      </div>
    </div>
  )
}

export default MainPage