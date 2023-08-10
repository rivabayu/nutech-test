import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { db, storage } from '../../firebase.config'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { collection, addDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

function AddProduct() {
  const [enterTitle, setEnterTitle] = useState('')
  const [enterCategory, setEnterCategory] = useState('')
  const [enterStock, setEnterStock] = useState('')
  const [enterPriceSell, setEnterPriceSell] = useState('')
  const [enterPriceBuy, setEnterPriceBuy] = useState('')
  const [enterImg, setEnterImg] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()


  const addProduct = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const docRef = await collection(db, 'product')
      const storageRef = ref(storage, `productImage/${Date.now() + enterImg.name}`)
      const uploadTask = uploadBytesResumable(storageRef, enterImg)

      uploadTask.on(() => {
        toast.error('image not upladed')
      },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await addDoc(docRef, {
              productName: enterTitle,
              stock: enterStock,
              priceSell: enterPriceSell,
              priceBuy: enterPriceBuy,
              category: enterCategory,
              imgUrl: downloadURL,
            }
            )
          })
        })
      toast.success('product added successfully')
      navigate('/dashboard/all-product')
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }


  }
  return (
    <div className=''>
      <div className='mt-10 px-40'>
        <div className='text-3xl'>
          Add Product
        </div>
        {
          loading ? (<h4 className='py-10 text-xl font-semibold'> Loading .....
            <progress className="progress w-56"></progress></h4>
          ) : (
            <form className='mt-5 w-full' onSubmit={addProduct}>
              <div className='flex flex-col mt-5'>
                <span className='text-md font-semibold text-orange-400'>Nama Produk</span>
                <input value={enterTitle} onChange={e => setEnterTitle(e.target.value)} required
                  type="text" placeholder='Product Name' className='border-2 rounded-lg  p-2 border-black' />
              </div>
              <div className='flex flex-col mt-5'>
                <span className='text-md font-semibold text-orange-400'>Harga Beli</span>
                <input value={enterPriceBuy} required onChange={e => setEnterPriceBuy(e.target.value)} type="number" placeholder='Rp.' className='border-2 rounded-lg  p-2 border-black' />
              </div>
              <div className='flex flex-col mt-5'>
                <span className='text-md font-semibold text-orange-400'>Harga Jual</span>
                <input value={enterPriceSell} required onChange={e => setEnterPriceSell(e.target.value)} type="number" placeholder='Rp.' className='border-2 rounded-lg  p-2 border-black' />
              </div>
              <div className='flex justify-between'>
                <div className='flex flex-col mt-5 '>
                  <span className='text-md font-semibold text-orange-400'>Stock</span>
                  <input value={enterStock} onChange={e => setEnterStock(e.target.value)} required type="number" placeholder='' className='border-2 lg:w-[50rem] rounded-lg  p-2 border-black' />
                </div>
                <div className='flex flex-col justify-center mt-5 w-40'>
                  <span className='text-md font-semibold text-orange-400'>Kategori</span>
                  <select value={enterCategory} onChange={e => setEnterCategory(e.target.value)} required className="border-2 rounded-lg p-2 border-black">
                    <option>Pilih Kategori</option>
                    <option value="sofa">Sofa</option>
                    <option value="mobile">Mobile</option>
                    <option value="chair">Chair</option>
                    <option value="watch">Watch</option>
                    <option value="wireless">Wireless</option>
                  </select>
                </div>

              </div>
              <div className='flex flex-col mt-5'>
                <span className='text-md font-semibold text-orange-400'>Gambar</span>
                <input type="file"
                  required onChange={e => setEnterImg(e.target.files[0])} className='border-2 rounded-lg  p-2 border-black' />
              </div>
              <div className='flex mt-20 '>
                <button type='submit' className="btn  mt-2 flex hover:bg-white hover:text-headingText bg-headingText text-white ">Add product</button>
              </div>
            </form>
          )

        }

      </div>
    </div>
  )
}

export default AddProduct