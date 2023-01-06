import Header from 'components/Header'
import ListedCountries from 'components/ListedCountry'
import Loading from 'components/Loading'
import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'

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
      <Loading />
    )
  }

  return (
    <div className='mainPage'>
      <Header />
      <div className='container d-flex justify-content-center flex-wrap my-4'>
        <div className="col-md-3 col-sm-12 rounded m-2">
          <input type="search" class="form-control rounded searchBar" onChange={searchCountry} placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
        </div>
        <div className="col-md-2 m-2">
          <Form.Select aria-label="Filter by region" name="filterBySelect" className='filterBySelect' onChange={searchCountry}>
            <option value='All' className='selectoption'>All</option>
            <option value='Americas' className='selectoption'>Americas</option>
            <option value='Europe' className='selectoption'>Europe</option>
            <option value='Asia' className='selectoption'>Asia</option>
            <option value='Africa' className='selectoption'>Africa</option>
            <option value='Oceania' className='selectoption'>Oceania</option>
          </Form.Select>
        </div>
      </div>
      <div className='flagsDiv container d-flex flex-wrap justify-content-center'>
        {
          filteredCountries.map(country => 
            <div className='col-md-3 p-3'><ListedCountries data={country} /></div>)
        }
      </div>
    </div>
  )
}

export default MainPage