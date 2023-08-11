import React, { useEffect, useState } from 'react'
import { MdOutlineShoppingBag } from 'react-icons/md'
import { Link } from 'react-router-dom'




function Header() {

  const [bgHeader, setBgHeader] = useState(false);
  useEffect(() => {
    window.addEventListener('scroll', () => {
      return window.scrollY > 100 ? setBgHeader(true) : setBgHeader(false)
    })
  })
  return (
    <div className={`${bgHeader ? 'bg-blue-300  shadow-xl' : 'bg-blue-100 shadow-none'} navbar z-50 fixed bg-base-100 px-5 md:px-20 lg:px-40 py-3 lg:py-5 transision-all duration-500`}>
      <div className="flex-1">
        <Link to={'/'}>
          <div className="font-bold text-xl">Shopping Cart</div>
        </Link>
      </div>
      <div className="flex-none">
        <Link to={'/dashboard/'}>
          <div className='font-semibold btn btn-ghost'>Dashboard</div>
        </Link>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost ">
          </label>
        </div>
      </div>
    </div>
  )
}

export default Header