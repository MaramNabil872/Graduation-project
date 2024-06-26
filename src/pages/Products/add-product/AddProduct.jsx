import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import './AddProduct.css';
import Header from '../../../components/Header/Header';

const AddProduct = () => {
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        imageUrl: '', // This will hold the URL or File object of the selected image
        quantity: '',
        category: '',
        expiryDate: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0]; // Get the first file from the selected files

        // Optionally check if file is selected
        if (!file) return;

        setProduct({
            ...product,
            imageUrl: URL.createObjectURL(file) // Create a URL for the selected file
        });
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
            cancelButtonText: 'Cancel'
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
                if (response.status === 200) {
                    Swal.fire({
                        title: 'Product added successfully!',
                        icon: 'success',
                        timer: 2000
                    });
                    // Optionally reset form state or redirect
                    setProduct({
                        name: '',
                        description: '',
                        price: '',
                        imageUrl: '',
                        quantity: '',
                        category: '',
                        expiryDate: ''
                    });
                    setSubmitted(false); // Reset submitted state
                }
            })
            .catch((error) => {
                console.error('Failed to add product:', error);
                Swal.fire({
                  title: 'Product added successfully!',
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
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="productExpiryDate">
                        <Form.Label className="form-label">Expiry Date</Form.Label>
                        <Form.Control
                            type="date"
                            placeholder="Enter product expiry date"
                            name="expiryDate"
                            value={product.expiryDate}
                            onChange={handleChange}
                            isInvalid={submitted && !product.expiryDate}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="productImageUrl">
                        <Form.Label className="form-label">Image Upload</Form.Label>
                        <Form.Control
                            type="file"
                            accept="image/*" // Accept only image files
                            onChange={handleImageChange}
                            isInvalid={submitted && !product.imageUrl}
                        />
                        {product.imageUrl && (
                            <img
                                src={product.imageUrl}
                                alt="Product Preview"
                                style={{ maxWidth: '100%', marginTop: '10px' }}
                            />
                        )}
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
