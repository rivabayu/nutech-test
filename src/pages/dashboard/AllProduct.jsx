import React from 'react'

function AllProduct() {
    return (
        <></>
        //     <div className=''>
        //     <div className='mt-10 px-40'>
        //       <div className='text-3xl'>
        //         Add Product
        //       </div>
        //       {
        //         loading ? (<h4 className='py-10 text-xl font-semibold'> Loading .....
        //         <progress className="progress w-56"></progress></h4> 
        //         ):(
        //           <form className='mt-5 w-full' onSubmit={addProduct}>
        //         <div className='flex flex-col mt-5'>
        //           <span className='text-md font-semibold text-orange-400'>Product title</span>
        //           <input value={enterTitle} onChange={e => setEnterTitle(e.target.value)} required
        //           type="text" placeholder='Product Name' className='border-2 rounded-lg  p-2 border-black'/>
        //         </div>
        //         <div className='flex flex-col mt-5'>
        //           <span className='text-md font-semibold text-orange-400'>Short Descriptions</span>
        //           <input value={enterShortDes} onChange={e => setEnterShortDes(e.target.value)} required
        //           type="text" placeholder='....' className='border-2 rounded-lg  p-2 border-black'/>
        //         </div>
        //         <div className='flex flex-col mt-5'>
        //           <span className='text-md font-semibold text-orange-400'>Description</span>
        //           <input value={enterDescription} required onChange={e => setEnterDescription(e.target.value)} type="text" placeholder='.....' className='border-2 rounded-lg  p-2 border-black'/>
        //         </div>
        //         <div className='flex justify-between'>
        //           <div className='flex flex-col mt-5 '>
        //             <span className='text-md font-semibold text-orange-400'>Price</span>
        //             <input value={enterPrice} onChange={e => setEnterPrice(e.target.value)} required type="number" placeholder='$' className='border-2 lg:w-[50rem] rounded-lg  p-2 border-black'/>
        //           </div>
        //           <div className='flex flex-col justify-center mt-5 w-40'>
        //           <span className='text-md font-semibold text-orange-400'>Category</span>
        //           <select value={enterCategory} onChange={e => setEnterCategory(e.target.value)} required className="border-2 rounded-lg p-2 border-black">
        //             <option> Select Category</option>
        //             <option value="sofa">Sofa</option>
        //             <option value="mobile">Mobile</option>
        //             <option value="chair">Chair</option>
        //             <option value="watch">Watch</option>
        //             <option value="wireless">Wireless</option>
        //           </select>
        //           </div>

        //         </div>
        //         <div className='flex flex-col mt-5'>
        //           <span className='text-md font-semibold text-orange-400'>Image</span>
        //           <input type="file"
        //            required onChange={e => setEnterImg(e.target.files[0])}  className='border-2 rounded-lg  p-2 border-black'/>
        //         </div>
        //       <div className='flex mt-20 '>
        //           <button type='submit' className="btn  mt-2 flex hover:bg-white hover:text-headingText bg-headingText text-white ">Add product</button>
        //           </div>
        //       </form>
        //         )
        //       }
        //     </div>
        // </div>
    )
}

export default AllProduct