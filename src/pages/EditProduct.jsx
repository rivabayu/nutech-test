import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useStateValue } from '../redux/StateProvider';
import { doc, updateDoc } from 'firebase/firestore';
import { firestore } from '../firebase.config';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
import Helmet from '../component/Helmet';
import CommonSection from '../component/CummonSections'
// import { subscribeToProducts, unsubscribeFromProducts } from '../utils/firebaseFunction';

function EditProduct() {
    const [{ items }, dispatch] = useStateValue();
    const { itemId } = useParams();

    const selectedItem = items.find(item => item.id === itemId);

    const navigate = useNavigate()

    const [editedProduct, setEditedProduct] = useState({
        title: selectedItem.title,
        category: selectedItem.category,
        priceBuy: selectedItem.priceBuy,
        priceSell: selectedItem.priceSell,
        qty: selectedItem.qty,
    });

    const handleEdit = async () => {
        try {
            const productDocRef = doc(firestore, 'Items', selectedItem.id);
            await updateDoc(productDocRef, editedProduct);
            console.log('Product updated successfully');
            toast.success('Produk Update Sukses')
            navigate('/dashboard')
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    return (
        <Helmet title="Edit Produk">
            <CommonSection title="Edit Produk" />
            <div className='w-full min-h-screen flex flex-col items-center justify-center '>
                <div className='flex'>
                </div>
                <h2>Nama Product {selectedItem.title}</h2>
                <div className='p-5 my-10 border-2 rounded-lg'>
                    <div className='flex justify-between gap-10 pb-5'>
                        <p className=' flex items-center justify-center '>Nama Produk</p>
                        <input
                            className="input input-bordered w-[200px] max-w-xs"
                            type="text"
                            value={editedProduct.title}
                            onChange={e => setEditedProduct({ ...editedProduct, title: e.target.value })}
                        />
                    </div>
                    <div className='flex justify-between gap-10 pb-5'>
                        <p className=' flex items-center justify-center'>Harga Jual</p>
                        <input
                            className="input input-bordered w-[200px] max-w-xs"
                            type="number"
                            value={editedProduct.priceSell}
                            onChange={e => setEditedProduct({ ...editedProduct, priceSell: e.target.value, priceSell: parseFloat(e.target.value) })}
                        />
                    </div>
                    <div className='flex justify-between gap-10 pb-5'>
                        <p className=' flex items-center justify-center'>Harga</p>
                        <input
                            className="input input-bordered w-[200px] max-w-xs"
                            type="number"
                            value={editedProduct.priceBuy}
                            onChange={e => setEditedProduct({ ...editedProduct, priceBuy: e.target.value, priceBuy: parseFloat(e.target.value) })}
                        />
                    </div>
                    <div className='flex justify-between gap-10 '>
                        <p className=' flex items-center justify-center'>Edit Stok</p>
                        <input
                            className="input input-bordered w-[200px] max-w-xs"
                            type="number"
                            value={editedProduct.qty}
                            onChange={e => setEditedProduct({ ...editedProduct, qty: e.target.value })}
                        />
                    </div>
                </div>

                {/* ... and so on for other fields */}
                <button className="btn btn-success" onClick={handleEdit}>Save Changes</button>
            </div>
        </Helmet>
    );
}
export default EditProduct;