// src/pages/ProductsPage/ProductsPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductsByStore } from '../../services/';
import BottomNav from '../../components/BottomNav/BottomNav';

const ProductsPage = () => {
    const { storeId } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const productsData = await getProductsByStore(storeId);
                setProducts(productsData);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchProducts();
    }, [storeId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Products</h1>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        {product.name} - ${product.price}
                    </li>
                ))}
            </ul>
            <BottomNav />
        </div>
    );
};

export default ProductsPage;
