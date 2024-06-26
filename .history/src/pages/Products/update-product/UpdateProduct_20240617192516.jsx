import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';

const UpdateProduct = ({ productId }) => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: ''
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Fetch product details based on productId (assuming you have an API endpoint for fetching a single product)
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${productId}`);
        const fetchedProduct = response.data; // Adjust based on your API response structure
        setProduct(fetchedProduct);
      } catch (error) {
        console.error('Failed to fetch product:', error);
      }
    };

    fetchProduct();
  }, [productId]);

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

  const updateProduct = () => {
    axios.put(`http://localhost:5000/api/products/${productId}`, product)
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
          title: 'Failed to update product',
          icon: 'error'
        });
      });
  };

  return (
    <div className="container">
      <h2>Update Product</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="productName">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter product name"
            name="name"
            value={product.name}
            onChange={handleChange}
            isInvalid={submitted && !product.name}
          />
          <Form.Control.Feedback type="invalid">
            Product name is required.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="productDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter product description"
            name="description"
            value={product.description}
            onChange={handleChange}
            isInvalid={submitted && !product.description}
          />
          <Form.Control.Feedback type="invalid">
            Product description is required.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="productPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter product price"
            name="price"
            value={product.price}
            onChange={handleChange}
            isInvalid={submitted && !product.price}
          />
          <Form.Control.Feedback type="invalid">
            Product price is required.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="productImageUrl">
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter product image URL"
            name="imageUrl"
            value={product.imageUrl}
            onChange={handleChange}
            isInvalid={submitted && !product.imageUrl}
          />
          <Form.Control.Feedback type="invalid">
            Product image URL is required.
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit">
          Update Product
        </Button>
      </Form>
    </div>
  );
};

export default UpdateProduct;
