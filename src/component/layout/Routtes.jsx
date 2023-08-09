import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from '../../pages/Home'
import AddProduct from '../../pages/dashboard/AddProduct'
import Shop from '../../pages/Shop'
import Header from '../Header'
import Singup from '../../pages/Singup'
import Login from '../../pages/Login'

function Routtes() {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addProduct" element={<AddProduct />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/login" element={<Login />} />
          <Route path="/singup" element={<Singup />} />
        </Routes>
      </Router>
    </div>
  )
}

export default Routtes

