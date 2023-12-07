import { useState, useEffect } from 'react';
import Layout from '../components/Layout';

function CartRow({ item }) {
    const total_price = (item.cart * item.price)
    return(
    <tr>
      <td>{item.name}</td>
      <td>{item.cart +' ' + item.unit}</td>
      <td>{'$'+item.price}</td>
      <td>{'$'+total_price}</td>
    </tr>
    )}


function OrderTable({ itemstring }) {
    const rows = itemstring
    .map((itemString) => {
        let item = JSON.parse(itemString);
    <CartRow key={item.id} item={item}/>}
    );
    return (
        <div>
        <table>
        <thead>
            <tr>
            <th colSpan="5">
                Items Ordered
            </th>
            </tr>
            <tr>
            <th>Name</th>
            <th>Quantity Selected</th>
            <th>Price</th>
            <th>Total Price</th>
            </tr>
        </thead>
        <tbody>{rows}</tbody>
        </table>
        </div>
        )}

export default function App() {
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        fetch('/api/get-orders')
        .then(response => response.json())
        .then(data => {
            setOrders(data);
        })
        .then(console.log(orders))
        .catch(error => console.error('Error:', error));
    }, []);
    return (
        <Layout>

        {orders.map((order) => (
        <div key={order.id}>
            <h2>Order #{order.id}</h2>
            <p>Customer: {order.name}</p>
            <p>Email: {order.email}</p>
            <p>Notes: {order.notes}</p>
            <div>
            {console.log(order.items)}
            {order.items.map((itemString) => {
                let item = JSON.parse(itemString);
                return (
                <div key={item.id}>
                    <p>{item.name} - Quantity: {item.cart} - Price: {item.price} </p>
                </div>
        )})}
            
            </div>
        </div>
        ))}
        </Layout>
)
}
