import Header from "components/Header"
import Loading from "components/Loading"
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
      <Loading />
    )
  }

  return (
    <div className="countryPage">
      <Header />
      <button onClick={() => setLocation('/')} className='btn btn-primary my-4 mx-3'> Go Back</button>
      <div className="container h-100 p-3 d-flex flex-wrap align-items-center">
        <img src={data?.flags?.png} alt={data?.name?.common} className="col-md-4 col-sm-12 border" />
        <div className="col-md-6 col-sm-12 countryInfo" style={{'margin-left': '3rem'}}>
          <h2 className="my-3">{data?.name?.official}</h2>
          <p className="my-2"><strong>Native Name: </strong>{data?.name?.nativeName[`${Object.keys(data?.name?.nativeName)[0]}`]?.common}</p>
          <p className="my-2"><strong>Population: </strong>{data?.population?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
          <p className="my-2"><strong>Region: </strong>{data?.region}</p>
          <p className="my-2"><strong>Sub Region: </strong>{data?.subregion}</p>
          <p className="my-2"><strong>Capital: </strong>{data?.capital?.join(', ')}</p>
        </div>
        
      </div>
    </div>
  )
}

export default CountryPage