import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { IonContent } from '@ionic/react';
import Header from '../../components/Header/Header';
import BottomNav from '../../components/BottomNav/BottomNav';
import NotFound from '../../components/NotFound/NotFound';
import classes from './Order.module.css';

export default function OrderTrackingPage() {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch order data from local storage or an API
        const storedOrder = JSON.parse(localStorage.getItem('order'));
        if (storedOrder && storedOrder.id === orderId) {
            setOrder(storedOrder);
        } else {
            // Implement an API call to fetch order details
            // fetchOrderDetails(orderId).then(order => setOrder(order));
        }
        setLoading(false);
    }, [orderId]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!order) {
        return (
            <IonContent>
                <Header />
                <NotFound message="Order not found." />
                <BottomNav />
            </IonContent>
        );
    }

    return (
        <IonContent>
            <Header />
            <div className={classes.tracking_page}>
                <h1>Order Tracking</h1>
                <div className={classes.order_details}>
                    <h2>Order ID: {order.id}</h2>
                    <p>Status: {order.status}</p>
                    <p>Estimated Delivery Date: {order.estimatedDelivery}</p>
                </div>

                <div className={classes.order_items}>
                    <h2>Order Items</h2>
                    <ul>
                        {order.items.map(item => (
                            <li key={item.id} className={classes.order_item}>
                                <img src={item.imageUrl} alt={item.title} className={classes.item_image} />
                                <div className={classes.item_details}>
                                    <h3>{item.title}</h3>
                                    <p>Quantity: {item.quantity}</p>
                                    <p>Price: ${item.price}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <BottomNav />
        </IonContent>
    );
}
