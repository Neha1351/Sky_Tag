import React from 'react'
import { Link } from 'react-router-dom'
import NavbarCargo from './NavbarCargo'
import NavbarAirport from './NavbarAirport'
import Navbarnolog from './Navbarnolog'
import NavbarPassenger from './NavbarPassenger'
import NavbarAdmin from '../Admin/NavbarAdmin'

function Navbar({auth}) {
  if(auth===0){
    return <Navbarnolog/>
  }
  else if(auth===1){
    return <NavbarPassenger/>
  }
  else if(auth===2){
    return <NavbarAirport/>
  }
  else if(auth===3){
    return <NavbarCargo/>
  }
  else if(auth==4){
    return <NavbarAdmin/>
  }
}

export default Navbar