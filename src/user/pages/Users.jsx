import React from 'react'

import UsersList from '../components/UsersList'

export default function Users() {
  const USERS = [{id: 'u1', name: 'Peter Falk', places: 3, image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FPeter_Falk&psig=AOvVaw0on8UZpQvRHe-bCNebGSVg&ust=1590438638871000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCOCb_emrzekCFQAAAAAdAAAAABAD'}];

  return (
    <UsersList items={USERS}/>
  )
}
