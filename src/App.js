import "./App.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import AddProduct from "./pages/dashboard/AddProduct";
import Header from './component/Header'
import { useStateValue } from './redux/StateProvider'
import { getAllProduct } from "./utils/firebaseFunction";
import { actionType } from "./redux/reducer";
import { useEffect } from "react";
import Dashboard from "./pages/dashboard/Dashboard";
import EditProduct from "./pages/EditProduct";
import Footer from "./component/Footer";


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
      <Route path="/editProduct/:itemId" element={<EditProduct />} />
      <Route path="/dashboard" element={<Dashboard />} />
      {/* <Route path="/login" element={<Login />} />
      <Route path="/singup" element={<Singup />} /> */}
    </Routes>
    <Footer />
  </Router>


}

export default App;
