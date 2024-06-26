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
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState(null);

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

  const handleDeleteProduct = async () => {
      try {
          await axios.delete(
              `http://localhost:5000/api/products/${productIdToDelete}`
          );
          setShowDeleteModal(false);
          fetchProducts();
      } catch (error) {
          console.error("Failed to delete product:", error);
      }
  };

  const handleCloseDeleteModal = () => {
      setShowDeleteModal(false);
      setProductIdToDelete(null);
  };

  const showDeleteConfirmation = (id) => {
      setProductIdToDelete(id);
      setShowDeleteModal(true);
  };

    if (loading) {
        return (
            <div className="loader-container">
                <div className="loader"></div>
            </div>
        );
    }

    return (
        <div>
            <Header />
            <div className="container">
                <h2>Products</h2>
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
                            <td>pic </td>
                            <td>pizza </td>
                            <td>something </td>
                            <td>299$ </td>
                            <td>1/3/2020 </td>
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
