import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import "./Products.css"; // Import the CSS file
import Header from "../../../components/Header/Header";
import { DropdownButton, Dropdown } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
      axios
          .delete(`http://localhost:5000/api/products/1`)
          .then(() => {
              toast.success("Product deleted successfully!", {
                  position: "top-right",
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
              });
              fetchProducts();
          })
          .catch((error) => {
              console.error("Failed to delete product:", error);
              toast.error("Failed to delete product", {
                  position: "top-right",
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
              });
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
