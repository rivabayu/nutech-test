import React from 'react'
import { MdOutlineShoppingBag } from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'
import ava from '../aseet/profile.png'



function Header() {

  return (
    <div className="navbar px-32 py-3 bg-blue-300">
      <div className="flex-1">
        <Link to={'/'}>
          <div className="font-bold text-xl">Shopping Cart</div>
        </Link>
      </div>
      <div className="flex-none">
        <Link to={'/shop/'}>
          <div className='font-semibold btn btn-ghost'>Shop</div>
        </Link>
        <Link to={'/dashboard/'}>
          <div className='font-semibold btn btn-ghost'>Dashboard</div>
        </Link>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost ">
            <div >
              <div className="indicator">
                <MdOutlineShoppingBag className='text-2xl' />
                <span className="badge badge-sm indicator-item">8</span>
              </div>
            </div>
          </label>
        </div>
      </div>
    </div>
  )
}

export default Header