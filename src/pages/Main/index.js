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
    const input = document.querySelector('.searchBar'),
          selector = document.querySelector('.filterBySelect')

    if(selector.value !== 'All'){
      setFilteredCountries(countries.filter(
          con => con.region === selector.value && con.name.common.toLowerCase().indexOf(input.value.toLowerCase()) !== -1
      ))
    } else {
      setFilteredCountries(countries.filter(
        con => con.name.common.toLowerCase().indexOf(input.value.toLowerCase()) !== -1
      ))
    }

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
          <select name="filterBySelect" className='filterBySelect' onChange={searchCountry}>
            <option disabled>Filter by Region</option>
            <option value='All' className='selectoption'>All</option>
            <option value='Americas' className='selectoption'>Americas</option>
            <option value='Europe' className='selectoption'>Europe</option>
            <option value='Asia' className='selectoption'>Asia</option>
            <option value='Africa' className='selectoption'>Africa</option>
            <option value='Oceania' className='selectoption'>Oceania</option>
          </select>
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