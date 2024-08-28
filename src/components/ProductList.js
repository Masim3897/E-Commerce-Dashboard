import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
    const [Products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, [])

    const getProducts = async () => {
        let result = await fetch("http://localhost:5000/get-product", {
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        setProducts(result);
        // console.log("products", Products);
    }

    // for delete
    const deleteProduct = async (id) => {
        let result = await fetch(`http://localhost:5000/product/${id}`, {
            method: "Delete",
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        if (result) {
            getProducts();
        }
    }
    // function for search product
    const searchHandle = async (event) => {
        let key = event.target.value;
        if (key) {
            let result = await fetch(`http://localhost:5000/search/${key}`,{
                headers: {
                    authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            });
            result = await result.json();
            if (result) {
                setProducts(result);
            }
        } else {
            getProducts();
        }

    }


    return (
        <div className="product-list">
            <h1>Pruduct List</h1>
            <input type="text" className="search-box" placeholder="Search Product"
                onChange={searchHandle}
            />

            <ul>
                <li>S. No</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Company</li>
                <li>Operation</li>
            </ul>

            {/* show product list by using map */}
            {
                Products.length > 0 ? Products.map((item, index) =>
                    <ul key={item._id}>
                        <li>{index + 1}</li>
                        <li>{item.name}</li>
                        <li>{item.price}</li>
                        <li>{item.category}</li>
                        <li>{item.company}</li>
                        <li>
                            <button onClick={() => deleteProduct(item._id)}>Delete</button>
                            <Link to={"/update/" + item._id}>Update</Link>

                        </li>
                    </ul>
                )
                    :
                    <h1>No Result Found</h1>
            }
        </div>
    )
}
export default ProductList;