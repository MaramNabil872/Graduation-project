import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'; // Import Axios
import BottomNav from '../../components/BottomNav/BottomNav';

const ProductsPage = () => {
    const { storeId } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await axios.get("https://fakestoreapi.com/products");
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
        const existingItem = storedCart.items.find(item => item.product.id === product.id);
        if (existingItem) {
            existingItem.quantity += 1;
            existingItem.price += product.price;
        } else {
            storedCart.items.push({ product: product, quantity: 1, price: product.price });
        }
        storedCart.totalCount += 1;
        storedCart.totalPrice += product.price;
        localStorage.setItem('cart', JSON.stringify(storedCart));
        console.log(Added $`{product.product_name} to cart);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Products</h1>
            <ul>
                {products.map((product) => (
                    <li key={product.product_id}>
                        {product.product_name} - ${product.list_price}
                        <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
                    </li>
                ))}
            </ul>
            <BottomNav />
        </div>
    );
};

export default ProductsPage;