import React, { useRef, useState, useEffect } from 'react'
import { AiFillPlusSquare } from 'react-icons/ai'
import formatCurrency from '../utils/formatToRupiah'


function ProductCard({ flag, data, scrollValue }) {
  const rowProduct = useRef()
  useEffect(() => {
    rowProduct.current.scrollLeft += scrollValue;
  }, [scrollValue]);

  return (
    <div
      ref={rowProduct}
      className={`w-full flex pb-10 items-center gap-5 my-12 scroll-smooth ${flag
        ? "overflow-x-scroll"
        : "overflow-x-hidden flex-wrap justify-center"
        }`}>
      {data && data.map(item => (
        <div
          key={item.id}
          className="w-[200px] h-full min-w-[200px] md:w-[200px] md:min-w-[250px] shadow-xl cursor-pointer m-auto">
          <figure className=" ">
            <img src={item?.imageURL} alt="product" className="w-full px-3 h-[12rem] hover:scale-110" />
          </figure>
          <div className="p-4">
            <div className="font-bold text-lg ">{item?.title}
            </div>
            <p className='text-sm'>{item?.category}</p>
            <div className='flex justify-between pt-5'>
              <div className='text-md font-semibold'><span>{formatCurrency(item?.priceBuy)} </span></div>
              <AiFillPlusSquare className='text-3xl -mt-2 hover:text-white hover:bg-black' />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ProductCard