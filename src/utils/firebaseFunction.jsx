import { collection, doc, getDocs, orderBy, query, deleteDoc, setDoc } from "firebase/firestore";
import { firestore } from "../firebase.config";

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

// export const deleteProduct = async (id) => {
//     try {
//         await deleteDoc(doc(firestore, 'Items', id));
//         console.log('Dokumen berhasil dihapus');
//     } catch (error) {
//         console.error('Error saat menghapus dokumen:', error);
//     }
// };

