import React from 'react'

import UsersList from '../components/UsersList'

export default function Users() {
  const USERS = [
    {id: 'u1', name: 'Peter Falk', places: 3, image: 'https://i.pinimg.com/564x/73/ec/b4/73ecb4f4cfeea0bb2e8760b942a07c88.jpg'}
  ];

  return (
    <UsersList items={USERS}/>
  )
}
