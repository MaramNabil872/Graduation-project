import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BottomNav from '../../components/BottomNav/BottomNav';

const StoresPage = () => {
    const { categoryId } = useParams();
    const [stores, setStores] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStores() {
            try {
                const response = await axios.get(`http://localhost:5000/categories/${categoryId}/stores`);
                setStores(response.data);
            } catch (error) {
                console.error('Error fetching stores:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchStores();
    }, [categoryId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Stores for Category {categoryId}</h1>
            <ul>
                {stores.map((store) => (
                    <li key={store.id}>
                        <p>{store.name}</p>
                    </li>
                ))}
            </ul>
            <BottomNav />
        </div>
    );
};

export default StoresPage;
