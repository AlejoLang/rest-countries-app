import Header from 'components/Header'
import ListedCountries from 'components/ListedCountry'
import React, { useEffect, useState } from 'react'
import './styles.css'

function MainPage() {

  const [countries, setCountries] = useState([])

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then(res => res.json())
      .then(data => setCountries(data))
  }, [])

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
      <div className='flagsDiv'>
      {
      countries.map(country => 
          <ListedCountries data={country} />
      )}
      </div>
    </div>
  )
}

export default MainPage