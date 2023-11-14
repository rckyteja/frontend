import React, { Component } from 'react';
import axios from 'axios';

class Products extends Component {
    state = {
        products: []
    }

    async componentDidMount() {
        const { data: products } = await axios.get("http://localhost:5174/products");
        console.log(products);
        this.setState({ products });
    }

    render() {
        return (
            <div>
                <h2>Products</h2>
                <table class="table">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.products.map(product => (
                            <tr>
                                <td>{product.title}</td>
                                <td>{product.price}</td>
                                <td>{product.quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>);
    }
}

export default Products;
