import React from 'react'
import { useParams } from 'react-router-dom'

export default function UpdatePlace() {
  const placeId = useParams().placeId;
  
  return (
    <div>
      Update Place
    </div>
  )
}
