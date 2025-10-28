import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/GlobalContext';
import { db } from '../firebase/config';
import Order from './Order';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useAuth();
  useEffect(() => {
    if (user) {
      const collRef = collection(db, 'users', user?.uid, 'orders');
      const orderedRef = query(collRef, orderBy('created', 'desc'));
      onSnapshot(orderedRef, (querySnapshot) => {
        setOrders(querySnapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })));
      });
    } else {
      setOrders([]);
    }
  }, [user]);
  return (
    <div className='my-5 w-[95%] max-w-6xl mx-auto px-2 sm:px-4'>
      <h1 className='text-2xl font-bold text-center md:text-left mb-6 text-gray-800'>Your Orders</h1>
      {orders.length === 0 && (<p className='text-gray-600 mt-8 text-center text-lg'>You have no orders yet.</p>)}
      <div className='orders-order grid grid-cols-1 md:grid-cols-1  gap-6'>
        {orders?.map((order) => (<Order key={order.id} order={order} />))}
      </div>
    </div>
  )
}

export default Orders
