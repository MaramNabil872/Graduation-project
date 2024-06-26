import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import './AddProduct.css';
import Header from '../../../components/Header/Header';

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: ''
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
      title: 'Are you sure you want to add this product?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#364574',
      cancelButtonColor: 'rgb(243, 78, 78)',
      confirmButtonText: 'Yes, add it!',
      cancelButtonText: 'Cancel',
      customClass: {
        container: 'swal-custom'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        addProduct();
      }
    });
  };

  const addProduct = () => {
    axios
      .post('http://localhost:5000/api/products', product)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          withReactContent(Swal).fire({
            title: 'Product added successfully!',
            icon: 'success',
            timer: 2000,
            customClass: {
              container: 'swal-custom'
            },
            backdrop: `
              rgba(0,0,123,0.4)
              left top
              no-repeat
            `
          }).then(() => {
            setProduct({
              name: '',
              description: '',
              price: '',
              imageUrl: ''
            });
          });
        } else {
          Swal.fire({
            title: 'Failed to add product',
            icon: 'error',
            customClass: {
              container: 'swal-custom'
            },
            backdrop: `
              rgba(123,0,0,0.4)
              left top
              no-repeat
            `
          });
        }
      })
      .catch((error) => {
        console.error('Failed to add product:', error);
        Swal.fire({
          title: 'Failed to add product',
          icon: 'error',
          customClass: {
            container: 'swal-custom'
          },
          backdrop: `
            rgba(123,0,0,0.4)
            left top
            no-repeat
          `
        });
      });
  };

  return (
    <div className="add">
      {/* <Header />
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
            <Form.Control.Feedback type="invalid">Product name is required.</Form.Control.Feedback>
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
            <Form.Control.Feedback type="invalid">Product description is required.</Form.Control.Feedback>
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
            <Form.Control.Feedback type="invalid">Product price is required.</Form.Control.Feedback>
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
            <Form.Control.Feedback type="invalid">Product image URL is required.</Form.Control.Feedback>
          </Form.Group>

          <Button variant="primary" type="submit">
            Add Product
          </Button>
        </Form>
      </div> */}
       <Button variant="primary" type="submit" onClick={}>fffff</Button>
    </div>
  );
};

export default AddProduct;
