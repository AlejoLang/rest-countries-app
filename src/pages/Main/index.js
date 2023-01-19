import Header from 'components/Header'
import ListedCountries from 'components/ListedCountry'
import Loading from 'components/Loading'
import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import { BsSortAlphaDown, BsSortAlphaDownAlt, BsSortDownAlt, BsSortDown} from 'react-icons/bs'
import Select from 'react-select'

function MainPage() {

  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [sortBySelectorValue, setSortBySelectroValue] = useState(null)

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then(res => res.json())
      .then(data => {setCountries(data); setFilteredCountries(data)})
  }, [])

  const selectOptions = [
    {
      value: "Def",
      label: (
        <div>
        </div>
      )
    },
    {
      value: "nameAZ",
      label: (
        <div className='d-flex align-items-center'>
          Name <BsSortAlphaDown/>
        </div>
      )
    },
    {
      value: "nameZA",
      label: (
        <div className='d-flex align-items-center'>
          Name <BsSortAlphaDownAlt />
        </div>
      )
    },
    {
      value: "pop09",
      label: (
        <div className='d-flex align-items-center'>
          Population <BsSortDownAlt />
        </div>
      )
    },
    {
      value: "pop90",
      label: (
        <div className='d-flex align-items-center'>
          Population <BsSortDown />
        </div>
      )
    }
  ];

  const searchCountry = (filter='') => {
    console.log(document.querySelector('.sortBySelect'))
    const input = document?.querySelector('.searchBar')?.value,
          selector = document?.querySelector('.filterBySelect') ?? {value: 'All'}

    if(selector.value !== 'All'){
      setFilteredCountries(countries.filter(
          con => con.region === selector.value && con.name.common.toLowerCase().indexOf(input.toLowerCase()) !== -1
      ))
    } else {
      setFilteredCountries(countries.filter(
        con => con.name.common.toLowerCase().indexOf(input.toLowerCase()) !== -1
      ))
    }

    switch (filter) {
      case 'nameAZ':
        setFilteredCountries([...filteredCountries].sort(
          (a, b) => a.name.official.toLowerCase() < b.name.official.toLowerCase() ? -1 :
                    a.name.official.toLowerCase() > b.name.official.toLowerCase() ? 1 : 0
        ))
        break;
      case 'nameZA':
        setFilteredCountries([...filteredCountries].sort(
          (a, b) => a.name.official.toLowerCase() > b.name.official.toLowerCase() ? -1 :
                    a.name.official.toLowerCase() < b.name.official.toLowerCase() ? 1 : 0
        ))
        break;
      case 'pop09':
        setFilteredCountries([...filteredCountries].sort(
          (a, b) => a.population - b.population 
        ))
        break;
      case 'pop90':
        setFilteredCountries([...filteredCountries].sort(
          (a, b) => b.population - a.population
        ))
        break;
      default:
        break;
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
          <input type="search" className="form-control rounded searchBar" onChange={searchCountry} placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
        </div>
        <div className="col-md-2 m-2">
          <Form.Select aria-label="Filter by region" name="filterBySelect" className='filterBySelect' onChange={searchCountry}>
            <option default disabled>Filter by</option>
            <option value='All' className='selectoption'>All</option>
            <option value='Americas' className='selectoption'>Americas</option>
            <option value='Europe' className='selectoption'>Europe</option>
            <option value='Asia' className='selectoption'>Asia</option>
            <option value='Africa' className='selectoption'>Africa</option>
            <option value='Oceania' className='selectoption'>Oceania</option>
          </Form.Select>
        </div>
        <div className="col-md-2 m-2">
          <Select options={selectOptions} onChange={e => searchCountry(e.value)} className='sortBySelect'/>
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