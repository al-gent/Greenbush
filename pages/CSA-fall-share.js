import React, { useState, useEffect } from 'react';
import Layout from '../components/layout';
import { fetchProducts } from '../lib/data';

export default function(){
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts().then(data => setProducts(data));
    }, []);

    return(
        <Layout>
            <h1>Products Available</h1>
            {products.map((product) => ( 
                <div key = {product.id}>
                    <h2>{product.name}</h2>
                    <p>{product.price}</p>
                    <p>{product.quantity}</p>
                </div>
            ))}
        </Layout>
    );
}