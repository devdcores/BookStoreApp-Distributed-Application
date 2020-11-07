import React, { useEffect, useState } from 'react';
import Product from '../components/Product'
import axios from 'axios';

const HomeScreen = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            // const response = await axios.get('http://localhost:8765/api/catalog/products');
            // console.log('devd' + response);

            await axios.get('http://localhost:8765/api/catalog/products')
                .then((response) => {
                    console.log(response.data.page.content);
                    setProducts(response.data.page.content)
                });
                
        };
        fetchData();
    }, [])
    return (
        <section className="featured-products">
            {products.map(product => (
                <Product key={product.productId} product={product}></Product>
            ))}
        </section>);
};

export default HomeScreen;