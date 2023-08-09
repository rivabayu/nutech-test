import React from 'react'
import { MdOutlineShoppingBag } from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'
import ava from '../aseet/profile.png'

import useAuth from '../custom-hooks/useAuth'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase.config'
// import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'


function Header() {

  // const totalQuantity = useSelector(state => state.cart.totalQuantity)
  const { currentUser } = useAuth()

  const navigate = useNavigate()

  const logout = () => {
    signOut(auth).then(() => {
      toast.success('Logged Out')
      navigate('/login')
    }).catch(erorr => {
      toast.error(erorr.message)
    })
  }

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
        <div className="dropdown dropdown-end px-2">
          <label tabIndex={0} className="btn btn-ghost">
            <div className="w-10 rounded-full">
              <img src={ava} alt="" />
            </div>
          </label>

          <ul tabIndex={0} className="menu menu-compact dropdown-content  mt-3 p-2 shadow bg-base-100 rounded-box w-52">
            {
              currentUser ?
                <div>
                  <li onClick={logout}><a>Logout</a></li>
                  <Link to='/dashboard'>
                    <li className=''><a>Dashboard</a></li>
                  </Link>
                </div>
                :
                <div>
                  <Link to='/login'>
                    <li className=' '><a>Login</a></li>
                  </Link>
                  <Link to='/singup'>
                    <li className=' '><a>Signup</a></li>
                  </Link>
                </div>
            }
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Header