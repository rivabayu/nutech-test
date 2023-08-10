import React, { useState } from 'react'
import { storage } from '../../firebase.config'
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { snapshotEqual } from 'firebase/firestore'
import { toast } from 'react-toastify'
import { AiOutlineCloudUpload, AiFillDelete } from 'react-icons/ai'
import Loader from '../../component/Loader'
import { getAllProduct, saveProduct } from '../../utils/firebaseFunction'
import { useStateValue } from '../../redux/StateProvider'
import { actionType } from '../../redux/reducer'

function AddProduct() {

  const [title, setTitle] = useState("");
  const [stock, setStock] = useState("");
  const [priceBuy, setPriceBuy] = useState("");
  const [priceSell, setPriceSell] = useState("");
  const [category, setCategory] = useState(null);
  const [imageAsset, setImageAsset] = useState(null);
  const [fields, setFields] = useState(false);
  const [alertStatus, setAlertStatus] = useState("danger");
  const [msg, setMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [{ items }, dispatch] = useStateValue();


  const uploadImage = (e) => {
    setIsLoading(true);
    const imageFile = e.target.files[0];
    // console.log(imageFile)
    const storageRef = ref(storage, `Images/${Date.now()}-${imageFile.name}`)
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on('state_changed', (snapshotEqual) => {
      const uploadProgess = snapshotEqual.bytesTransferred / snapshotEqual.totalBytes * 100;
    }, (erorr) => {
      console.log(erorr);
      setFields(true)
      setMsg('erorr while uploading : Try again...');
      setAlertStatus('danger')
      setTimeout(() => {
        setFields(false)
        setIsLoading(false)
      }, 4000)
    }, () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setImageAsset(downloadURL);
        setIsLoading(false);
        setFields(true);
        setMsg("Image uploaded successfully 😊");
        setAlertStatus("success");
        setTimeout(() => {
          setFields(false);
        }, 4000);
      });
    })
  }

  const deleteImage = () => {
    setIsLoading(true);
    const deleteRef = ref(storage, imageAsset);
    deleteObject(deleteRef).then(() => {
      setImageAsset(null);
      setIsLoading(false);
      setFields(true);
      setMsg("Image deleted successfully 😊");
      setAlertStatus("success");
      setTimeout(() => {
        setFields(false);
      }, 4000);
    });
  }

  const saveDetails = () => {
    setIsLoading(true);
    try {
      if (!title || !stock || !imageAsset || !priceSell || !priceBuy || !category) {
        setFields(true);
        setMsg("Required fields can't be empty");
        setAlertStatus("danger");
        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 4000);
        clearData();
      } else {
        const data = {
          id: `${Date.now()}`,
          title: title,
          imageURL: imageAsset,
          category: category,
          qty: stock,
          priceBuy: priceBuy,
          priceSell: priceSell,
        };
        saveProduct(data);
        setIsLoading(false);
        setFields(true);
        setMsg("Data Uploaded successfully 😊");
        setAlertStatus("success");
        setTimeout(() => {
          setFields(false);
        }, 4000);
        clearData();
      }
    } catch (error) {
      console.log(error);
      setFields(true);
      setMsg("Error while uploading : Try Again 🙇");
      setAlertStatus("danger");
      setTimeout(() => {
        setFields(false);
        setIsLoading(false);
      }, 4000);
    }

    fetchData()
  };
  const clearData = () => {
    setTitle("");
    setImageAsset(null);
    setStock("");
    setPriceBuy("");
    setPriceSell("");
    setCategory("Select Category");
  };

  const fetchData = async () => {
    try {
      const data = await getAllProduct();
      dispatch({
        type: actionType.SET_ITEMS,
        items: data,
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  return (

    <div className="w-full min-h-screen flex flex-col items-center justify-center ">
      <div className='font-semibold text-black text-2xl mb-10'
      >Tambah Product</div>
      <div className="w-[90%] md:w-[50%] border border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center gap-4">
        {fields && (
          <div
            className={`w-full p-2 rounded-lg font-semibold text-lg text-center ${alertStatus === 'danger'
              ? 'bg-red-400 text-red-800'
              : 'bg-blue-200 text-blue-500'
              }`}>
            {msg}
          </div>
        )}
        <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
          <input
            type='text'
            required value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Isi Nama Disini'
            className=" w-full h-full text-lg bg-transparent font-semibold outline-none border-none placeholder:text-gray-500 text-textColor" />
        </div>
        <div className="w-full">
          <select
            required value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="outline-none w-full text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
          > <option value="other" className="bg-white">
              Select Category
            </option>
            <option value="electronik">Electronik</option>
            <option value="makanan">Makanan</option>
            <option value="jam">Jam</option>
            <option value="perabot">Perabot</option>
          </select>

        </div>

        <div className="group flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full h-225 md:h-340 cursor-pointer rounded-lg">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {!imageAsset ? (
                <>
                  <label className="w-20 h-20 flex flex-col items-center justify-center cursor-pointer">
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                      <AiOutlineCloudUpload className="text-gray-500 text-3xl hover:text-gray-700" />
                      <p className="text-gray-500 hover:text-gray-700">
                        Click here to upload
                      </p>
                    </div>
                    <input
                      type="file"
                      name="uploadimage"
                      accept="image/*"
                      onChange={uploadImage}
                      className="w-0 h-0"
                    />
                  </label>
                </>
              ) : (
                <>
                  <div className="relative h-full">
                    <img
                      src={imageAsset}
                      alt="uploaded image"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md  duration-500 transition-all ease-in-out"
                      onClick={deleteImage}
                    >
                      <AiFillDelete className="text-white" />
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>

        <div className="w-full flex flex-col md:flex-row items-center gap-3">
          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">

            <input
              type="number"
              required
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              placeholder="Stok barang"
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
            />
          </div>

          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <p className="text-gray-700 text-[1rem]">Rp.</p>
            <input
              type="number"
              required
              value={priceBuy}
              onChange={(e) => setPriceBuy(e.target.value)}
              placeholder="Harga Jual"
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
            />
          </div>
          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <p className="text-gray-700 text-[1rem]">Rp.</p>
            <input
              type="Number"
              required
              value={priceSell}
              onChange={(e) => setPriceSell(e.target.value)}
              placeholder="Harga Beli"
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
            />
          </div>
        </div>

        <div className="flex items-center w-full">
          <button
            type="button"
            className="ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-blue-500 px-12 py-2 rounded-lg text-lg text-white font-semibold"
            onClick={saveDetails}
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddProduct