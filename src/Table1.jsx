import './App.css';
import React, { useContext, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { Button, ModalBody } from 'react-bootstrap';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import { Link, useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import { productContext } from './App';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Table1() {
  const { products, productId, setProductId, setselectedProduct, setProducts } = useContext(productContext)

  const [show, setShow] = useState(false);
  const [deleted, setdeleted] = useState(false);
  const [searchTerm, setsearchTerm] = useState('');
  const [search,setsearch]=useState('');

  const navigate = useNavigate();


  let [filtrdproduct] = products.filter((data) => data.id === productId);
  const handleClose = () => setShow(false);

  const handleShow = (id) => {
    setShow(true);
    setProductId(id)
  }

  const deleteClose = () => setdeleted(false);

  const deleteShow = (id) => {
    setdeleted(true);
    setProductId(id);
  }

  const handleDelete = () => {
    setProducts((prevProducts) => prevProducts.filter((data) => data.id !== productId));
    deleteClose();
    notify();
  };

  const handleEdit = (i) => 
  {
    setselectedProduct(i);
  }

  const notify = () =>
    {

       toast.error("The product "+ filtrdproduct?.title +" was successfully deleted!",{icon:<DeleteIcon style={{color:"red"}}/>});
    }

    const handlesearch=(event)=>
    {
      setsearchTerm(event.target.value);
      const results=products.filter((item)=>
      item.title.toLowerCase().includes(searchTerm));
      setProducts(results);
    }
    // products.filter((item) => {
    //   return searchTerm || search.toLowerCase() === '' 
    //     ? item
    //     : item.title.toLowerCase().includes(searchTerm);
    // })

    // const onSearch=(searchVal)=>
    // {
    //   setsearchTerm(searchVal);
    //   console.log(searchVal);
      
    // }
  //    const handleSearchClick=()=> 
  //    {
  //       if (searchTerm ==='') 
  //         { setProducts(products); 
  //          return;
  //          }
  //           console.log(searchTerm);

  //        const filterBySearch = 
  //       products.filter((item) => 
  //       {
  //         return searchTerm.toLowerCase()===''
  // ?item
  // :item.title.toLowerCase().includes(searchTerm); 
  //       })
        
  //       if(products.length<1)
  //         {
  //           setProducts(products)
  //         }
  //       else
  //     {
  //       setProducts(filterBySearch);
  //     }     
  //   }
  
  


  return (
    <div>


      <h1 style={{ textAlign: "center" }}> Products</h1>

      
      <div>

        <b>Search  </b><input className='inputfield' type="text" placeholder='Type to search...'
        onChange={handlesearch}>
        </input>
        {/* {(e) => setsearch(e.target.value)}> */}
        <SearchOutlinedIcon onClick={() => handlesearch(searchTerm)}/>
        
        </div>
      <Table striped bordered hover style={{ border: "10px", marginLeft: "10px", marginRight: "20px", marginTop: "10px" }}>
        <thead>
          <tr>
            <th>Sl No</th>
            <th>Product Name</th>
            <th>Image</th>
            <th>Description</th>
            <th>Price</th>
            <th>View</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
        
          {products.filter((item) => {
            return searchTerm || search.toLowerCase() === '' 
              ? item
              : item.title.toLowerCase().includes(searchTerm);
          })
            .map((item) => {
              return (

                // <tbody>
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.title}</td>
                  <td><img src={item.thumbnail} style={{ width: "25px", height: "30px" }} alt="" /></td>
                  <td>{item.description}</td>
                  <td>{item.price}</td>

                  <td><Link to=""><VisibilityIcon fontSize="medium" style={{ color: "green" }} onClick={() => handleShow(item.id)} /></Link></td>
                  <td><Link to="/EditProduct"><EditIcon fontSize="medium" style={{ color: "blue" }} onClick={() => handleEdit(item)} /></Link></td>
                  <td><Link to=""><DeleteIcon fontSize="medium" style={{ color: "red" }} onClick={() => deleteShow(item.id)} /></Link></td>
                </tr>
                //  </tbody>
              );
            }
            )}
        </tbody>

      </Table>

      <div style={{ textAlign: "end", marginRight: "10px" }}>
      <Button style={{textAlign:"left" }} onClick={() => navigate('/createProduct')}>Create Product</Button>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}

      >
        <div className='backgroundcolormodal'>
          <Modal.Header className='modalheader' closeButton>
            <Modal.Title>{filtrdproduct?.title}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            {filtrdproduct?.description}
          </Modal.Body>
          <Modal.Body>
            <img src={filtrdproduct?.thumbnail} style={{ width: "100px", height: "100px" }} alt="" />
          </Modal.Body>
          <ModalBody>
            Price: {filtrdproduct?.price}
          </ModalBody>

          <Modal.Footer>
            <Button variant="primary" onClick={handleClose}>Close</Button>
          </Modal.Footer>
        </div>
      </Modal>

      <Modal
        show={deleted}
        onHide={deleteClose}
        backdrop="static"
        keyboard={false}
      >

        <div className='backgroundcolormodal1'>
          <Modal.Header closeButton>
            <Modal.Title>{filtrdproduct?.title}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <img src={filtrdproduct?.thumbnail} style={{ width: "100px", height: "100px" }} alt="" />
          </Modal.Body>
          <Modal.Body><b><i>Are you sure to delete above item??</i></b></Modal.Body>

          <Modal.Footer>
            <Button variant="primary" onClick={handleDelete}>Delete</Button>

            <Button variant="primary" onClick={deleteClose}>Cancel</Button>
          </Modal.Footer>
        </div>

      </Modal>
      <ToastContainer  position='top-center'/> 
    </div>
  )
}

export default Table1