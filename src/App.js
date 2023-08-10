import "./App.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Shop from './pages/Shop'
import AddProduct from "./pages/dashboard/AddProduct";
import Header from './component/Header'
import { useStateValue } from './redux/StateProvider'
import { getAllProduct } from "./utils/firebaseFunction";
import { actionType } from "./redux/reducer";
import { useEffect } from "react";


function App() {
  const [{ items }, dispatch] = useStateValue();

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


  useEffect(() => {
    fetchData()
  }, [])

  return <Router>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/addProduct" element={<AddProduct />} />
      <Route path="/shop" element={<Shop />} />
      {/* <Route path="/login" element={<Login />} />
      <Route path="/singup" element={<Singup />} /> */}
    </Routes>
  </Router>


}

export default App;
