// src/pages/StoresPage/StoresPage.js
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getStoresByCategory } from '../../services/productService';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import BottomNav from '../../components/BottomNav/BottomNav';

const StoresPage = () => {
    const { categoryId } = useParams();
    const [stores, setStores] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStores() {
            try {
                const storesData = await getStoresByCategory(categoryId);
                setStores(storesData);
            } catch (error) {
                console.error('Error fetching stores:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchStores();
    }, [categoryId]);

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <div>
            <h1>Stores</h1>
            <ul>
                {stores.map((store) => (
                    <li key={store.id}>
                        <Link to={`/stores/${store.id}/products`}>{store.name}</Link>
                    </li>
                ))}
            </ul>
            <BottomNav />
        </div>
    );
};

export default StoresPage;
