import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import './AddProduct.css';
import Header from '../../../components/Header/Header';
import Swal from 'sweetalert2';

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
    quantity: 0,
    category: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

   
    Swal.fire({
      title: 'Are you sure you want to update this product?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#364574',
      cancelButtonColor: 'rgb(243, 78, 78)',
      confirmButtonText: 'Yes, update it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        updateProduct();
      }
    });
  };


  const addProduct = () => {
    axios
      .post('http://localhost:5000/api/products', product)
      .then((response) => {
        console.log(response);
        .then((response) => {
          if (response.status === 200) {
            Swal.fire({
              title: 'Product updated successfully!',
              icon: 'success',
              timer: 2000
            });
            // Optionally reset form state or redirect
          }
        })
        .catch((error) => {
          console.error('Failed to update product:', error);
          Swal.fire({
            title: 'Product updated successfully!',
            icon: 'success',
          });
        });
    };
  
  return (
    <div className="add">
      <Header />
      <div className="container">
        <h2>Add Product</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="productName">
            <Form.Label className="form-label">Product Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter product name"
              name="name"
              value={product.name}
              onChange={handleChange}
              isInvalid={submitted && !product.name}
            />
            {/* <Form.Control.Feedback type="invalid">Product name is required.</Form.Control.Feedback> */}
          </Form.Group>

          <Form.Group className="mb-3" controlId="productDescription">
            <Form.Label className="form-label">Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter product description"
              name="description"
              value={product.description}
              onChange={handleChange}
              isInvalid={submitted && !product.description}
            />
            {/* <Form.Control.Feedback type="invalid">Product description is required.</Form.Control.Feedback> */}
          </Form.Group>

          <Form.Group className="mb-3" controlId="productPrice">
            <Form.Label className="form-label">Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter product price"
              name="price"
              value={product.price}
              onChange={handleChange}
              isInvalid={submitted && !product.price}
            />
            {/* <Form.Control.Feedback type="invalid">Product price is required.</Form.Control.Feedback> */}
          </Form.Group>

          <Form.Group className="mb-3" controlId="productQuantity">
            <Form.Label className="form-label">Quantity</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter product quantity"
              name="quantity"
              value={product.quantity}
              onChange={handleChange}
              isInvalid={submitted && !product.quantity}
            />
            {/* <Form.Control.Feedback type="invalid">Product quantity is required.</Form.Control.Feedback> */}
          </Form.Group>

          <Form.Group className="mb-3" controlId="productCategory">
            <Form.Label className="form-label">Category</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter product category"
              name="category"
              value={product.category}
              onChange={handleChange}
              isInvalid={submitted && !product.category}
            />
            {/* <Form.Control.Feedback type="invalid">Product category is required.</Form.Control.Feedback> */}
          </Form.Group>

          <Form.Group className="mb-3" controlId="productImageUrl">
            <Form.Label className="form-label">Image URL</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter product image URL"
              name="imageUrl"
              value={product.imageUrl}
              onChange={handleChange}
              isInvalid={submitted && !product.imageUrl}
            />
            {/* <Form.Control.Feedback type="invalid">Product image URL is required.</Form.Control.Feedback> */}
          </Form.Group>

          <Button type="submit" className="add-product">
            Add Product
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default AddProduct;
