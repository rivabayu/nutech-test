import React, { useRef, useState, useEffect } from 'react'
import img from '../aseet/pxfuel.jpg'
import { AiFillPlusSquare } from 'react-icons/ai'
import { useStateValue } from '../redux/StateProvider'
import { actionType } from '../redux/reducer'





function ProductCard() {

  const rowProduct = useRef()
  const [items, setItems] = useState([])
  const [{ cartItems }, dispatch] = useStateValue()


  // useEffect(() => {
  //   rowProduct.current.scrollLeft += scrollvalue
  // }, [scrollvalue])

  useEffect(() => {

  })
  return (
    <div className=''>
      <div className="card w-[16rem] h-[20rem] bg-base-100 shadow-xl cursor-pointer m-none">
        <figure className=" ">
          <img src={img} alt="product" className="w-52 h-[12rem] hover:scale-110" />
        </figure>
        <div className="p-4">
          <div className="font-bold text-lg ">produt 1
          </div>
          <p className='text-sm'></p>
          <div className='flex justify-between pt-5'>
            <div className='text-md font-semibold'><span>Rp. </span></div>
            <AiFillPlusSquare className='text-3xl -mt-2 hover:text-white hover:bg-black' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard