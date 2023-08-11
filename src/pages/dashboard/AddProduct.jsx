import React, { useState } from 'react'
import { storage } from '../../firebase.config'
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { AiOutlineCloudUpload, AiFillDelete } from 'react-icons/ai'
import Loader from '../../component/Loader'
import { saveProduct } from '../../utils/firebaseFunction'
import { useStateValue } from '../../redux/StateProvider'
import Helmet from '../../component/Helmet'
import CommonSection from '../../component/CummonSections'

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

    // Validasi tipe file
    if (imageFile.type !== 'image/jpeg' && imageFile.type !== 'image/png') {
      setFields(true);
      setMsg('File harus dalam format JPG atau PNG.');
      setAlertStatus('danger');
      setTimeout(() => {
        setFields(false)
        setIsLoading(false)
      }, 4000)
      clearData();
      return;
    }

    // validasi ukuran file
    if (imageFile.size > 100 * 1024) {
      setFields(true);
      setMsg('ukuran gambar tidak boleh lebih dari 100kb');
      setAlertStatus('danger');
      setTimeout(() => {
        setFields(false)
        setIsLoading(false)
      }, 4000)
      clearData();
      return;
    }

    console.log(imageFile)
    const storageRef = ref(storage, `Images/${Date.now()}-${imageFile.name}`)
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on('state_changed', (snapshotEqual) => {
      const uploadProgess = snapshotEqual.bytesTransferred / snapshotEqual.totalBytes * 100;
    }, (erorr) => {
      console.log(erorr);
      setFields(true)
      setMsg('Terjadi kesalahan saat mengunggah gambar. Coba lagi.');
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
        setMsg("Gambar berhasil diunggah 😊");
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
      setMsg("Gambar berhasil dihapus 😊");
      setAlertStatus("success");
      setTimeout(() => {
        setFields(false);
      }, 4000);
    });
  }

  const saveDetails = () => {
    setIsLoading(true);
    try {
      const parsedPriceSell = parseFloat(priceSell);
      const parsedPriceBuy = parseFloat(priceBuy);
      const parsedStock = parseInt(stock);

      if (
        !title ||
        !stock ||
        !imageAsset ||
        isNaN(parsedPriceSell) ||
        isNaN(parsedPriceBuy) ||
        isNaN(parsedStock) ||
        parsedPriceSell <= 0 ||
        parsedPriceBuy <= 0 ||
        parsedStock <= 0
      ) {
        setFields(true);
        setMsg("input data salah");
        setAlertStatus("danger");
        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 4000);
        clearData();
      } else {
        const itemExists = items.some(item => item.title === title);
        if (itemExists) {
          setFields(true);
          setMsg("Item dengan nama yang sama sudah ada");
          setAlertStatus("danger");
          setTimeout(() => {
            setFields(false);
            setIsLoading(false);
          }, 4000);
          clearData();
          return;
        }
        const data = {
          id: `${Date.now()}`,
          title: title,
          imageURL: imageAsset,
          category: category,
          qty: parsedStock,
          priceBuy: parsedPriceBuy,
          priceSell: parsedPriceSell,
        };
        saveProduct(data);
        setIsLoading(false);
        setFields(true);
        setMsg("Data Berhasil diupload 😊");
        setAlertStatus("success");
        setTimeout(() => {
          setFields(false);
        }, 4000);
        clearData();
      }
    } catch (error) {
      console.log(error);
      setFields(true);
      setMsg("Terjadi kesalahan saat mengunggah gambar. Coba lagi. 🙇");
      setAlertStatus("danger");
      setTimeout(() => {
        setFields(false);
        setIsLoading(false);
      }, 4000);
    }
  };

  const clearData = () => {
    setTitle("");
    setImageAsset(null);
    setStock("");
    setPriceBuy("");
    setPriceSell("");
    setCategory("Select Category");
  };

  return (
    <Helmet title='Tambah Produk'>
      <CommonSection title='Tambah Produck' />
      <div className="w-full min-h-screen flex flex-col items-center justify-center ">
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
              <option value="Pakaian">Pakaian</option>
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
                type="number"
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
    </Helmet>

  )
}

export default AddProduct