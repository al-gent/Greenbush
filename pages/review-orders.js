import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { set } from 'zod';

function editOrder(order) {
    fetch('/api/edit-order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}


function EditRow({ product }) {
    const [quantity, setQuantity] = useState(product.cart);
    const total_price = (product.cart * product.price)
    return(
    <tr>
      <td>{product.name}</td>
      <td>{product.cart} {product.unit} </td>
      <td>

      <input
        type="integer"
        value={quantity}
        onChange={e => {
            setQuantity(e.target.value);
        }}
        ></input>
        </td>
      <td>{'$'+product.price}</td>
      <td>{'$'+total_price}</td>
    </tr>
    )}

function CartRow({ product }) {
    const [quantity, setQuantity] = useState(product.cart);
    const total_price = (product.cart * product.price)
    return(
    <tr>
      <td>{product.name}</td>
      <td>{quantity +' ' + product.unit}</td>
      <td>{'$'+product.price}</td>
      <td>{'$'+total_price}</td>
    </tr>
    )}


function OrderTable({ products }) {
    //state for quantity of each item needs to live here and then be passed down to children
    // so it can update when the button is clicked
    const [order, setOrder] = useState(products);
    const [edit, setEdit] = useState(false);
    console.log('render')
    let orderTotal = 0;
    const rows = order.map((itemString) => {
        let item = JSON.parse(itemString);
        orderTotal = orderTotal + (item.price * item.cart)
        return (
            edit ? <EditRow key = {item.id} product={item}/> :
            <CartRow key = {item.id} product={item}/>
        )})

    return (
        <div>
        <table>
        <thead>
            <tr>
            <th colSpan="5">
                Items Ordered 
            </th>
            {edit ? 
            <button onClick={() => 
            setOrder(products.map((itemString) => {
            }))
            (setEdit(false))
            }>Save Order</button> 
            :
            <button onClick={() => (setEdit(true))}>Edit Order</button>}
            </tr>
            <tr>
            <th>Name</th>
            <th>Quantity Desired</th>
            {edit && <th>New Quantity </th> }
            <th>Price</th>
            <th>Total Price</th>
            </tr>
        </thead>
        <tbody>{rows}</tbody>
        </table>
        <hr></hr>
        <p>Checkout total: ${orderTotal} </p>
        {/* fix order status */}
        <p>Order Status: {order.status}</p>
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
        .catch(error => console.error('Error:', error));
    }, []);
    return (
        <Layout>
        {orders.map((order) => (
            <div key={order.id}>
            <h2>Order #{order.id}</h2>
            <OrderTable products={order.items}/>
            <p>Customer: {order.name}</p>
            <p>Email: {order.email}</p>
            <p>Notes: {order.notes}</p>

        </div>
        ))}
        </Layout>
)
}
