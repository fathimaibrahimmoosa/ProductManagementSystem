import React, { useContext, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { productContext } from './App';
import { toast, ToastContainer } from 'react-toastify';

function EditProduct() 
{
  
    const {selectedProduct,setProducts}=useContext(productContext)
    const [input, setinput] = useState({title:selectedProduct.title,description:selectedProduct.description,price:selectedProduct.price});

    const navigate=useNavigate();

    const GetInput=(e)=>
    {
      setinput({...input,[e.target.name]:e.target.value});    
    }

    const SubmitData=(e)=>
    {
      e.preventDefault();
      setProducts((data)=>
      {
        const newProduct=data.map((item)=>
        {
          if(item.id===selectedProduct.id)
          {
              const newProduct=
              {
                ...item,
                title:input?.title,
                description:input?.description,
                price:input?.price,
              };
            return newProduct;
          }
          return item;
        });
        return newProduct;
      });
      console.log(input);
      notify();
    }
    const notify = () =>
      {
  
         toast.info("The product details of "+ input?.title +" was successfully edited!");
         setTimeout(() => {
          navigate('/');
        }, 5000);
      }
                   
    return (
      <div>EditProduct
        <h3 className="mt-5">Update Product Details</h3>
        <Form className="w-25 m-auto mt-5" style={{textAlign:"left"  }} onSubmit={SubmitData}>

          <Form.Group className="mb-3">
            <Form.Label>Product Id</Form.Label>
            <Form.Control id="id" type="id" defaultValue={selectedProduct?.id}readOnly placeholder="Enter Product Id" onChange={GetInput} name="id" />     
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Product Name</Form.Label>
            <Form.Control id="title" type="name" defaultValue={selectedProduct?.title} placeholder="Enter Product name" onChange={GetInput} name="title" />     
          </Form.Group>
      
          <Form.Group className="mb-3">
            <Form.Label>Product Description</Form.Label>
            <Form.Control id="description" as="textarea" rows={3} defaultValue={selectedProduct?.description} placeholder="Enter product description" onChange={GetInput} name="description" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Product Price</Form.Label>
            <Form.Control id="price" type="number" defaultValue={selectedProduct?.price} placeholder="Enter product Price" onChange={GetInput} name="price" />
          </Form.Group>

          <Button variant="primary" type="submit"> Update Item </Button>
          <Button variant="primary" onClick={()=>navigate('/')} style={{marginLeft:"5px"}}> Cancel </Button>

        </Form>
        <ToastContainer  position='top-center'/> 
      </div>
    )
}

export default EditProduct