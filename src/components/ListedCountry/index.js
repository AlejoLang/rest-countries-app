import React from 'react'
import { Link } from 'wouter'
import './styles.css'

function ListedCountries({data}) {
  return (
    <Link href={`/country/${data?.name?.common}`} >
      <div className='listedCountry'>
        <img src={data?.flags?.png} alt={data?.name?.common} className='listedCountryImg'/>
        <div className='listedCountryInfo'>
            <p className='listedCountryName'>{data?.name?.official}</p>
            <p className='listedCountryData'><span>Population: </span>{data?.population?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
            <p className='listedCountryData'><span>Capital: </span>{data?.capital?.join(', ')}</p>
            <p className='listedCountryData'><span>Region: </span>{data?.region}</p>
        </div>
      </div>
    </Link>
  )
}

export default ListedCountries