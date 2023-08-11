import React, { useState } from 'react';
import formatCurrency from '../utils/formatToRupiah';
import formatRupiah from '../utils/formatToRupiah';
import { doc, deleteDoc } from 'firebase/firestore';
import { firestore } from '../firebase.config';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

function List({ data }) {
  const [modal, setModal] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);


  const deleteProduct = async (id) => {
    try {
      await deleteDoc(doc(firestore, 'Items', id));
      console.log('Dokumen berhasil dihapus');
      toast.success('file berhasil dihapus')
    } catch (error) {
      console.error('Error saat menghapus dokumen:', error);
    }
  };

  const handleDelete = () => {
    if (selectedItemId) {
      deleteProduct(selectedItemId);
      setSelectedItemId(null);
      setModal(false);
    }
  };

  const handleCancel = () => {
    setSelectedItemId(null);
    setModal(false);
  };

  const setModalBox = (itemId) => {
    setSelectedItemId(itemId);
    setModal(!modal);
  };

  return (
    <div>
      {modal && (
        <div className="bg-[rgba(0,0,0,0.07)] z-[99] fixed top-0 bottom-0 right-0 left-0 flex justify-center items-center">
          <div className="mx-auto max-w-screen-lg flex items-center justify-center">
            <div className="w-[95%] md:w-[85%] max-h-[90vh] bg-white rounded-xl flex flex-col p-8">
              Anda yakin ingin menghapus product?
              <div className="mt-20 flex gap-10 justify-end">
                <button onClick={handleCancel} className="btn">
                  Tidak
                </button>
                <button onClick={handleDelete} className="btn btn-error">
                  Hapus
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {data &&
        data.map((data) => (
          <div key={data.id} className="card card-side bg-base-100 shadow-xl my-10 hover:scale-105">
            <figure>
              <img src={data?.imageURL} className="w-[200px] p-2 lg:w-[300px] h-[200px]" alt="gambar" />
            </figure>
            <div className="card-body px-5 py-5">
              <h2 className="card-title">{data?.title}</h2>
              <div className="gap-2 flex">
                <p>{data?.category}</p>
                <p>
                  Stok : <span>{data?.qty}</span>
                </p>
              </div>
              <div className="gap-2 flex">
                Harga Beli <span className="text-gray-500">{formatCurrency(data?.priceSell)}</span>
              </div>
              <div className="gap-2 flex">
                Harga Jual <span className="text-gray-500">{formatRupiah(data?.priceBuy)}</span>
              </div>
              <div className="card-actions justify-end">
                <Link to={`/editProduct/${data.id}`} data={data}>
                  <button className="btn btn-success">Edit</button>
                </Link>
                <button onClick={() => setModalBox(data.id)} className="btn btn-error">
                  Hapus
                </button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default List;