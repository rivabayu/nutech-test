import React from 'react'
import ProductCard from './ProductCard'
function ProductList() {
  return (
    <div className='mt-4 flex flex-row justify-center gap-10 md:grid md:grid-cols-2 md:overflow-x-hidden  lg:grid lg:grid-cols-4 lg:overflow-visible mx-16'>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
    </div>
  )
}

export default ProductList