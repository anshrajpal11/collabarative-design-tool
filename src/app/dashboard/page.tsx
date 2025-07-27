"use client"

import React from 'react'
import { signout } from '~/actions/auth'

const page = () => {
  return (
    <div>
      dashboard
      <button onClick={()=>signout()}>SIGNOUT</button>
    </div>
  )
}

export default page
