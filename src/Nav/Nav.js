import React from 'react'

import './Nav.css'
import '../App/App.css'



const Nav = ({ logoResetTable, allRestaurantData }) => {
  return(
    <nav>
      <h1 onClick={() => logoResetTable(allRestaurantData)} className="logo cursor-pointer">Restauraunt Locator</h1>
    </nav>
  )
}

export default Nav