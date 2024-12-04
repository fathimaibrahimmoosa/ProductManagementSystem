import './App.css';
import Table1 from './Table1';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import CreateProduct from './CreateProduct';
import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import EditProduct from './EditProduct';

export const productContext=createContext();


function App() 
{
     const [products, setProducts] = useState([])
     const [productId,setProductId]=useState();
     const [selectedProduct,setselectedProduct]=useState();
     
     const api="https://dummyjson.com/products";
    useEffect(() => 
    {
      
       axios.get(api).then((res)=>setProducts(res.data.products))
      
    }, [])
    
  return (
    
    <div className="App">
      <productContext.Provider value={{products,setProducts,productId,setProductId,selectedProduct,setselectedProduct}} >
       
       <BrowserRouter>
       <Routes>
          <Route path="/" element={<Table1 />}/>
         <Route path="/createProduct" element={<CreateProduct />}/>
         <Route path="/editProduct" element={<EditProduct />}/>
       </Routes>
       </BrowserRouter> 
       </productContext.Provider>
       
       </div>
   
  );
}

export default App;
// export {productContext}
