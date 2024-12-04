import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { productContext } from './App';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function CreateProduct() 
{
   const {products,setProducts}=useContext(productContext)

    let idd=products.length+1;
    const [input, setinput] = useState({id:idd,title:"",description:"",price:"", })

    const GetInput=(e)=>
    {
      setinput({...input,[e.target.name]:e.target.value});
    }

    const navigate=useNavigate();
    const SubmitData=(e)=>
    {
        e.preventDefault();
        const updatedProductData = [...products,input]; 
        setProducts(updatedProductData);
        notify();    
    }
    
    const notify = () =>
      {
  
         toast.success("The product "+input?.title+" was successfully added!");
         setTimeout(() => {
          navigate('/');
        }, 5000);
      }

    return(
    <div>
      <h3 className="mt-5">Add New Product</h3>
      <Form className="w-25 m-auto mt-5" style={{textAlign:"left"}} onSubmit={SubmitData}>

        <Form.Group className="mb-3">
          <Form.Label>Product Id</Form.Label>
          <Form.Control id="id" type="text" value={idd} readOnly placeholder="Product Id"  name="id" />     
        </Form.Group>
      
        <Form.Group className="mb-3">
          <Form.Label>Product Name</Form.Label>
          <Form.Control id="title" type="name" placeholder="Enter Product name" onChange={GetInput} name="title" />     
        </Form.Group>
      
        <Form.Group className="mb-3">
          <Form.Label>Product Description</Form.Label>
          <Form.Control id="description" as="textarea" rows={3} placeholder="Enter product description" onChange={GetInput} name="description" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Product Price</Form.Label>
          <Form.Control id="price" type="" placeholder="Enter product Price" onChange={GetInput} name="price" />
        </Form.Group>

        <Button variant="primary" type="submit" >Add Item</Button>
        <Button variant="primary" onClick={()=>navigate('/')} style={{marginLeft:"5px"}}>Cancel</Button>
      </Form>
      
      {/* <ToastContainer  position='top-center'/>  */}

    </div>
  )
}

export default CreateProduct