import React from 'react'
import { useParams } from 'react-router-dom'

import PlaceList from '../components/PlaceList'


const DUMMY_PLACES = [
  {
    id: 'p1',
    title: 'Empire State Building',
    description: 'One of the most famous sky scrapers in the world.',
    imageUrl: 'https://lh6.googleusercontent.com/proxy/e-uaRXnEw7eRiz_o1herqMfTZdHev2iBayVdC_P8qoYx5CbHTWVSmie0-qj1V9OCOU7Ijd8XWfeHROcz2SBRJMyqcX08KPx5l9XDMHBz80_JNOUKRZHCYt0fUF5pyo5QS9LfWmJmRsNVaLRKcCojMkVSdFlScJI=w408-h272-k-no',
    address: '20 W 34th St, New York, NY 10001, United States',
    location: {
      lat: 40.7484405,
      lng: -73.9878531
    },
    creator: 'u1'
  },
  {
    id: 'p2',
    title: 'Empire State Building',
    description: 'One of the most famous sky scrapers in the world.',
    imageUrl: 'https://lh6.googleusercontent.com/proxy/e-uaRXnEw7eRiz_o1herqMfTZdHev2iBayVdC_P8qoYx5CbHTWVSmie0-qj1V9OCOU7Ijd8XWfeHROcz2SBRJMyqcX08KPx5l9XDMHBz80_JNOUKRZHCYt0fUF5pyo5QS9LfWmJmRsNVaLRKcCojMkVSdFlScJI=w408-h272-k-no',
    address: '20 W 34th St, New York, NY 10001, United States',
    location: {
      lat: 40.7484405,
      lng: -73.9878531
    },
    creator: 'u2'
  }
]

export default function UserPlaces() {

  const userId = useParams().userId;
  const loadedPlaces = DUMMY_PLACES.filter(place => place.creator === userId);

  return (
    <PlaceList items={loadedPlaces}/>
  )
}
