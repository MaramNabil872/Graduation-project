import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import "./Products.css"; // Import the CSS file
import Header from "../../../components/Header/Header";
import { DropdownButton, Dropdown } from "react-bootstrap";

const ProductsComponent = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                "http://localhost:5000/api/products"
            );
            setProducts(response.data);
        } catch (error) {
            console.error("Failed to fetch products:", error);
        } finally {
            setLoading(false);
        }
    };

    const deleteProduct = (id) => {
        Swal.fire({
            title: "Are you sure you want to delete this product?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#364574",
            cancelButtonColor: "rgb(243, 78, 78)",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
            customClass: {
                container: "my-swal", // Add a custom class
            },
            // Adjust z-index to a high value
            backdrop: true,
            focusConfirm: false,
            didOpen: () => {
                Swal.getPopup().style.zIndex = "9999";
            },
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .delete(`http://localhost:5000/api/products/${id}`)
                    .then(() => {
                        Swal.fire({
                            title: "Product deleted successfully!",
                            icon: "success",
                            timer: 2000,
                        });
                        fetchProducts();
                    })
                    .catch((error) => {
                        console.error("Failed to delete product:", error);
                        Swal.fire({
                            title: "Failed to delete product",
                            icon: "error",
                        });
                    });
            }
        });
    };

    if (loading) {
        return (
            <div className="loader-container">
                <div className="loader"></div>
            </div>
        );
    }

    return (
        <div className="all">
            <Header />
            <div className="container">
              <div className="header1"> <h2>Products</h2>
              <Link to='/add-product' className="add-product">add product</Link></div>
               
                <Table responsive striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Photo</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Expiry Date</th>
                            <th>Quantity</th>

                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>pic</td>
                            <td>pizza</td>
                            <td>something</td>
                            <td>299$</td>
                            <td>1/3/2020</td>
                            <td>quantity</td>

                            <td>
                                <DropdownButton
                                    id="dropdown-basic-button"
                                    title="Actions"
                                    // Set drop="up" to show dropdown above
                                >
                                    <Dropdown.Item
                                        as={Link}
                                        to={`update-product/1`}
                                    >
                                        Edit
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        onClick={() => deleteProduct(1)}
                                        className="delete-button"
                                    >
                                        Delete
                                    </Dropdown.Item>
                                </DropdownButton>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default ProductsComponent;