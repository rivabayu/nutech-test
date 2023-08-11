import React from 'react'
import { Link } from 'react-router-dom'
import ProductList from '../component/ProductList'
import MenuContainer from '../component/MenuContainer'
import Hero from '../aseet/hero-img.png'
import Clock from '../component/Clock'
import imgdiskon from '../aseet/counter-timer-img.png'

function Home() {
  const date = new Date().getFullYear()
  return (
    <>
      {/* hero section */}
      <section className='px-32 pb-10 pt-32 bg-heroBgColor'>
        <div className='flex justify-center'>
          <div className=''>
            <p className='text-md text-black font-semibold py-2'>Produk Unggulan tahun {date} </p>
            <h2 className='text-4xl font-bold
            py-2'>Pilih Barang Yang Kamu!</h2>
            <p className='text-sm py-2 pr-7 lg:pr-40 text-black'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa nihil recusandae magnam, assumenda, tempora omnis atque ratione iusto quidem perspiciatis aut possimus quam quas neque sint, aperiam illo explicabo voluptatem?</p>
            <button className='border-b-2 pt-5 border-black font-semibold hover:scale-110'>
              <Link to='/shop'>Beli Sekarang
              </Link></button>
          </div>
          <div className=''>
            <img src={Hero} className='w-[50rem]' alt="" />
          </div>
          <div className=''>
          </div>
        </div>
        <div></div>
      </section>

      <MenuContainer />

      {/* diskon */}
      <section className='mt-6 bg-[#0a1d37] h-[400px]'>
        <div className='flex justify-between md:mx-20 lg:mx-48'>
          <div className='flex flex-col justify-center'>
            <div className=''>
              <div className='text-xl font-light text-white'>
                Summer Sale </div>
              <div className='text-2xl font font-semibold text-white'>Chair Heaven</div>
            </div>
            <Clock />
            <Link to='/shop'>
              <button className="btn bg-white text-[#0a1d37] hover:bg-[#0a1d37] hover:text-white btn-active">Kunjungi Toko</button>
            </Link>
          </div>
          <div>
            <img src={imgdiskon} className='object-contain text-end' alt="" />
          </div>
        </div>
      </section>
    </>

  )
}

export default Home