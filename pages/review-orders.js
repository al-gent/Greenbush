import { useState, useEffect } from 'react';
import Layout from '../components/Layout';

function EditRow({ product, setQuantity }) {
    const total_price = (product.cart * product.price)
    return(
    <tr>
      <td>{product.name}</td>
      <td>{product.cart} {product.unit} </td>
      <td>

      <input
        type="integer"
        placeholder={product.cart}
        value={product.editedCart || ''}
        onChange={e => {
            setQuantity(e.target.value, product.id);
        }}
        ></input>
        </td>
      <td>{'$'+product.price}</td>
      <td>{'$'+total_price}</td>
    </tr>
    )}

function CartRow({ product }) {
    const total_price = (product.cart * product.price)
    return(
    <tr>
      <td>{product.name}</td>
      {product.editedCart ? <td><del>{product.cart}</del>{' '+product.editedCart+ ' ' + product.unit}</td> : <td>{product.cart + ' ' + product.unit} </td>}
      <td>{'$'+product.price}</td>
      <td>{'$'+total_price}</td>
    </tr>
    )}


function OrderTable({ order, editOrder, updateOrder }) {
    const [edit, setEdit] = useState(false);
    let products = order.items;
    let orderTotal = 0;
    const rows = products.map((itemString) => {
        let item = JSON.parse(itemString);
        orderTotal = orderTotal + (item.price * item.cart)
        return (
            edit ? <EditRow key = {item.id} product={item} setQuantity={(quantity, productID) => editOrder({newQuantity: quantity, order, productID})}/> :
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
            <th><button onClick={e => (
                e.preventDefault,
                console.log('onClick', order),
                updateOrder({order}),
                setEdit(false))}>Save Order</button> </th>
            :
            <th> <button onClick={() => setEdit(true)}>Edit Order</button></th>}
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
        </div>
        )}

export default function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        fetch('/api/get-orders')
        .then(response => response.json())
        .then(data => {
            setOrders(data);
        })
        .catch(error => console.error('Error:', error));
    }, []);

    function editOrder({order, newQuantity, productID})   {
        const nextOrders = orders.map((o) => {
          if (o.id === order.id) {
            order.items = order.items.map((itemString) => {
                let item = JSON.parse(itemString);
                if (item.id === productID) {
                    item.editedCart = newQuantity;
                    return JSON.stringify(item);
                } else {
                    return itemString;
                }
            })
            return { ...o, status: 'edited'};
          } else{
            return o;
          }
        });
        setOrders(nextOrders)
      }    

    function updateOrder({order}) {
        setIsLoading(true);
        console.log('updateOrder', order);
        fetch('/api/update-orders', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'},
        body: JSON.stringify(order) 
        })
        .then(response => {
            if (!response.ok) {
            throw new Error('Network response was not ok');
            }
            return response.json();
        })
        // .then(response => { // emails to customers sent here
            // return EmailGB({order});
        // })
        .then(response => {
            setIsLoading(false)})
        .catch(error => console.error('Error:', error));
    }

    function updateOrderStatus({orderID, status}) {
        setIsLoading(true);
        console.log('updateOrderStatus', orderID, status);
        fetch('/api/update-order-status', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'},
        body: JSON.stringify({orderID, status}) 
        })
        .then(response => {
            if (!response.ok) {
            throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(response => {
            setIsLoading(false)})
        .then(data => {
            setOrders(orders.map(order => order.id === orderID ? { ...order, status } : order));
        })
        .catch(error => console.error('Error:', error));
    }

    return (
        <Layout>
        {orders.map((order) => (
            <div key={order.id}>
            <h2>{order.name} Order #{order.id}</h2>
            <OrderTable order={order} editOrder={editOrder} updateOrder={updateOrder}/>
            <p>Notes: {order.notes}</p>
            <p>Order status: 
                <select value ={order.status} onChange={(e) => updateOrderStatus({orderID: order.id, status: e.target.value})}>
                    <option value ="pending">Pending</option>
                    <option value ="edited">Edited</option>
                    <option value ="confirmed">Confirmed</option>
                    <option value ="completed">Completed</option>
                </select>

                </p>

        </div>
        ))}
        </Layout>
)
}
