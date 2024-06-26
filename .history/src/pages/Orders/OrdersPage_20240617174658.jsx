import React, { useEffect, useState } from 'react';
import { getAll } from '../../services/orderService';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getAll();
        setOrders(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>My Orders</h1>
      <ul>
        {orders.map(order => (
          <li key={order.id}>
            <p>Order ID: {order.id}</p>
            <p>Status: {order.status}</p>
            <p>Total: ${order.total}</p>
            {/* Add more details as required */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyOrders;
