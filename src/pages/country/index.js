import { useEffect, useState } from "react"
import { useLocation } from "wouter"


function CountryPage({params}) {
  
  const [data, setData] = useState()
  const [location, setLocation] = useLocation()

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/name/' + params?.country)
      .then(res => res.json())
      .then(info => setData(info[0]))
  }, [params])

  if(!data){
    return (
      <p>Loading...</p>
    )
  }

  return (
    <div className="countryPage">
      <button onClick={() => setLocation('/')}> Go Back</button>
      <div className="countryInfoDiv">
        <img src={data?.flags?.png} alt={data?.name?.common} className="countryInfoFlag" />
        <div className="countryInfoPrincipal">
          <h2 className="countryInfoPrincipalTitle">{data?.name?.official}</h2>
          <p className="countryInfoPrincipalInfo"><span>Native Name: </span>{data?.name?.nativeName[`${Object.keys(data?.name?.nativeName)[0]}`]?.common}</p>
          <p className="countryInfoPrincipalInfo"><span>Population: </span>{data?.population?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
          <p className="countryInfoPrincipalInfo"><span>Region: </span>{data?.region}</p>
          <p className="countryInfoPrincipalInfo"><span>Sub Region: </span>{data?.subregion}</p>
          <p className="countryInfoPrincipalInfo"><span>Capital: </span>{data?.capital?.join(', ')}</p>
        </div>
        
      </div>
    </div>
  )
}

export default CountryPage