import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'
import ProductCard from './ProductCard';
import { useStateValue } from '../redux/StateProvider';


function MenuContainer() {
    const [scrollValue, setScrollValue] = useState(0);
    const [{ items }, dispatch] = useStateValue(0)
    console.log(items)
    return (
        <section className='px-32 py-10 flex flex-col'>
            <div className='w-full flex items-center justify-between pb-5'>
                <p className='text-2xl font-semibold capitalize relative before:absolute before:rounded-lg content before:w-32 before:h-1 before:-bottom-2 before:bg-gradient-to-tr from-blue-400 to-blue-600 transition-all ease-in-out duration-100 text-black'>
                    Produk Unggulan
                </p>
                <div className="flex md:flex gap-3 items-center">
                    <motion.div
                        whileTap={{ scale: 0.75 }}
                        className="w-8 h-8 rounded-lg bg-blue-300 hover:bg-blue-500 cursor-pointer hover:shadow-lg flex items-center justify-center"
                        onClick={() => setScrollValue(-400)}
                    >
                        <AiOutlineLeft className="text-lg text-white" />
                    </motion.div>
                    <motion.div
                        whileTap={{ scale: 0.75 }}
                        className="w-8 h-8 rounded-lg bg-blue-300 hover:bg-blue-500 cursor-pointer transition-all duration-100 ease-in-out hover:shadow-lg flex items-center justify-center"
                        onClick={() => setScrollValue(400)}
                    >
                        <AiOutlineRight className="text-lg text-white" />
                    </motion.div>
                </div>
            </div>
            <div className='pt-6'>
                <ProductCard
                    scrollValue={scrollValue}
                    flag={true}
                    data={items}
                />
            </div>
        </section>
    )
}

export default MenuContainer