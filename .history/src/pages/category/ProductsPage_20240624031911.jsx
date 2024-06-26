import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BottomNav from '../../components/BottomNav/BottomNav';
import RestaurantCard from '../../components/RestaurantCard/RestaurantCard'; // Adjust import path as needed

const ProductsPage = () => {
    const { storeId } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await axios.get(http://localhost:5000/stores/${storeId}/products);
                const productsData = response.data;
                setProducts(productsData);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchProducts();
    }, [storeId]);

    const handleAddToCart = (product) => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || { items: [], totalCount: 0, totalPrice: 0 };
        const existingItem = storedCart.items.find(item => item.product.product_id === product.product_id);
        if (existingItem) {
            existingItem.quantity += 1;
            existingItem.list_price += product.list_price;
        } else {
            storedCart.items.push({ product: product, quantity: 1, price: product.list_price });
        }
        storedCart.totalCount += 1;
        storedCart.totalPrice += product.price;
        localStorage.setItem('cart', JSON.stringify(storedCart));
        //console.log(Added ${product.product_name} to cart);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Products</h1>
            <div className="restaurant-list">
                {products.map((product) => (
                    <RestaurantCard
                        key={product.product_id}
                        product={product}
                        onAddToCart={handleAddToCart}
                    />
                ))}
            </div>
            <BottomNav />
        </div>
    );
};

export default ProductsPage;