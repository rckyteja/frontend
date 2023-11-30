import axios from "axios";
import { FormEvent, useEffect, useRef, useState } from "react";

interface Product {
    id: number;
    title: string;
    price: number;
    quantity: number;
}

const Products = () => {
    const [products, setProducts] = useState<Product[]>();
    const titleRef = useRef<HTMLInputElement>(null);
    const priceRef = useRef<HTMLInputElement>(null);
    const quantityRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        const res = await axios.get<Product[]>("http://localhost:5174/products");
        setProducts(res.data);
    }

    const onDelete = async (id: number) => {
        const res = await axios.delete("http://localhost:5174/products/" + id, {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem("token"),
                'X-JeffMaxwell': 'Hello'
            }
        });
        console.log(res);
        getProducts();
    }

    const onAdd = async () => {
        var productData = {
            title: titleRef.current?.value,
            price: priceRef.current?.value,
            quantity: quantityRef.current?.value
        };

        const res = await axios.post("http://localhost:5174/products", productData, {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem("token")
            }
        });
        getProducts();
    }

    return (
        <div>
            <h2>Products</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th></th>
                        <th></th>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {products?.map((product) => (
                    <tr key={product.id}>
                        <td></td>
                        <td><button onClick={ () => onDelete(product.id) }>Delete</button></td>
                        <td>{product.title}</td>
                        <td>{product.price}</td>
                        <td>{product.quantity}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <h2>Add Product</h2>
                <form>
                    <label>Title:</label>
                    <input ref={titleRef} type="text" id="inputTitle" />
                    <label>Price:</label>
                    <input ref={priceRef} type="number" id="inputPrice" />
                    <label>Quantity:</label>
                    <input ref={quantityRef} type="number" id="inputQuanity" />
                    <button type="submit" onClick={() => onAdd()}>Add</button>
                </form>
            </div>
        </div>
    );
}

export default Products;


