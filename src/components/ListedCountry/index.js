import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'wouter'

function ListedCountries({data}) {
  return (
    <Link href={`/country/${data?.name?.common}`}>
      <Card style={{'aspect-ratio': '1 / 1.2', 'cursor': 'pointer'}}  className='bg-primary'>
        <Card.Img variant="top" src={data?.flags?.png} className='border-bottom' style={{'aspect-ratio': '16/9'}}/>
        <Card.Body>
          <Card.Title className='mb-3'>{data?.name?.official}</Card.Title>
          <Card.Text className='mt-1 mb-1'>
            <strong>Population: </strong>{data?.population?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </Card.Text>
          <Card.Text className='mt-1 mb-1'>
            <strong>Capital: </strong>{data?.capital?.join(', ')}
          </Card.Text>
          <Card.Text className='mt-1 mb-1'>
            <strong>Region: </strong>{data?.region}
          </Card.Text>
        </Card.Body>
      </Card>
    </Link>
  )
}

export default ListedCountries