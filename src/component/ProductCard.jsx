import React from 'react'
import img from '../aseet/pxfuel.jpg'
import {AiFillPlusSquare} from 'react-icons/ai'
function ProductCard() {
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