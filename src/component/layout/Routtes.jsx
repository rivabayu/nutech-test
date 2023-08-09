import React from 'react'
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from '../../pages/Home'
import AddProduct from '../../pages/AddProduct'




function Routtes() {
  return (
    <div>
    <Router>
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/addProduct" element={<AddProduct/>}/>
    </Routes>
  </Router> 
    </div>
  )
}

export default Routtes

