// import { collection, doc, getDocs, orderBy, query, deleteDoc, setDoc } from "firebase/firestore";
// import { firestore } from "../firebase.config";

// export const saveProduct = async (data) => {
//     await setDoc(doc(firestore, "Items", `${Date.now()}`), data, {
//         merge: true,
//     });
// };

// export const getAllProduct = async () => {
//     const items = await getDocs(
//         query(collection(firestore, "Items"), orderBy("id", "desc"))
//     );

//     return items.docs.map((doc) => doc.data());
// };

// export const deleteProduct = async (id) => {
//     try {
//         await deleteDoc(doc(firestore, 'Items', id));
//         console.log('Dokumen berhasil dihapus');

//     } catch (error) {
//         console.error('Error saat menghapus dokumen:', error);
//     }
// };

import { collection, doc, onSnapshot, orderBy, query, deleteDoc, setDoc, updateDoc, getDocs } from "firebase/firestore";
import { firestore } from "../firebase.config";

let unsubscribe = null;

export const subscribeToProducts = (callback) => {
    const q = query(collection(firestore, "Items"), orderBy("id", "desc"));

    unsubscribe = onSnapshot(q, (snapshot) => {
        const products = snapshot.docs.map((doc) => doc.data());
        callback(products);
    });
};

export const unsubscribeFromProducts = () => {
    if (unsubscribe) {
        unsubscribe();
        unsubscribe = null;
    }
};

export const saveProduct = async (data) => {
    await setDoc(doc(firestore, "Items", `${Date.now()}`), data, {
        merge: true,
    });
};

export const getAllProduct = async () => {
    const items = await getDocs(
        query(collection(firestore, "Items"), orderBy("id", "desc"))
    );

    return items.docs.map((doc) => doc.data());
};

export const deleteProduct = async (id) => {
    try {
        await deleteDoc(doc(firestore, 'Items', id));
        console.log('Dokumen berhasil dihapus');
    } catch (error) {
        console.error('Error saat menghapus dokumen:', error);
    }
};

export const updateProduct = async (id, data) => {
    try {
        const productDocRef = doc(firestore, 'Items', id);
        await updateDoc(productDocRef, data);
        console.log('Product updated successfully');
    } catch (error) {
        console.error('Error updating product:', error);
    }
};

