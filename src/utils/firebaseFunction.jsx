import { collection, doc, getDocs, orderBy, query, setDoc } from "firebase/firestore";
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


