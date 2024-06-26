import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getAllOrders } from '../../services/orderService';
import classes from './ordersPage.module.css';
import Title from '../../components/Title/Title';
import NotFound from '../../components/NotFound/NotFound';

const OrdersPage = () => {
  const { filter } = useParams();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        console.log('Fetching orders...');
        const orders = await getAllOrders(filter);
        console.log('Orders fetched:', orders);
        if (Array.isArray(orders)) {
          setOrders(orders);
        } else {
          console.error('Expected orders to be an array:', orders);
          setOrders([]);
        }
      } catch (error) {
        console.error('Failed to fetch orders:', error);
        setOrders([]);
      }
    };

    fetchOrders();
  }, [filter]);

  return (
    <div className={classes.container}>
      <Title title="My Orders" margin="1.5rem 0 0 .2rem" fontSize="1.9rem" />

      <div className={classes.all_status}>
        <Link to="/my-orders" className={!filter ? classes.selected : ''}>
          All
        </Link>
        <Link
          to={`/my-orders/pending`}
          className={filter === 'pending' ? classes.selected : ''}
        >
          Pending
        </Link>
        <Link
          to={`/my-orders/completed`}
          className={filter === 'completed' ? classes.selected : ''}
        >
          Completed
        </Link>
      </div>

      {orders.length === 0 ? (
        <NotFound linkRoute="/my-orders" linkText="Show All" />
      ) : (
        <div className={classes.orders}>
          {orders.map(order => (
            <div key={order.id} className={classes.order}>
              <div className={classes.orderNumber}>
                Order #{order.id}
              </div>
              <div className={classes.orderStatus}>
                Status: {order.status}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
