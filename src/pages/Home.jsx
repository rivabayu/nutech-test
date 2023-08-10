import React from 'react'
import { Link } from 'react-router-dom'
import ProductList from '../component/ProductList'
import MenuContainer from '../component/MenuContainer'

function Home() {
  return (
    <>
      {/* hero section */}
      <section className='px-32 py-10 bg-heroBgColor'>
        <div className='flex justify-center'>
          <div className=''>
            <p className='text-md text-black font-semibold py-2'>Produk Unggulan tahun </p>
            <h2 className='text-4xl font-bold
            py-2'>Pilih Barang Yang Kamu!</h2>
            <p className='text-sm py-2 pr-7 lg:pr-40 text-black'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa nihil recusandae magnam, assumenda, tempora omnis atque ratione iusto quidem perspiciatis aut possimus quam quas neque sint, aperiam illo explicabo voluptatem?</p>
            <button className='border-b-2 pt-5 border-black font-semibold hover:scale-110'>
              <Link to='/shop'>Beli Sekarang
              </Link></button>
          </div>
          <div className=''>
          </div>
        </div>
        <div></div>
      </section>

      <MenuContainer />

      {/* Product List */}
      <section>
        <div className='flex justify-center font-semibold px-5 py-5 text-xl'>Produk Unggulan</div>
        <div className='flex justify-center text-2xl'>
          <ProductList />
        </div>
      </section>


    </>

  )
}

export default Home