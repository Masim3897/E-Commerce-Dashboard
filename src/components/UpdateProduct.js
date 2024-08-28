import React, { useEffect } from "react";
import { json } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";

const UpdateProduct = () => {
    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [company, setCompany] = React.useState('');
    const navigate = useNavigate();

    const params = useParams();
    // useeffect use to fetch data on every render
    useEffect(() => {
        console.warn(params);
        getProductDetail();
    }, []);
    // in this dunction i can call the single product api
    // and show product on update form 
    const getProductDetail = async () => {
        let result = await fetch(`http://localhost:5000/get-product/${params.id}`, {
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        setName(result.name)
        setPrice(result.price)
        setCategory(result.category)
        setCompany(result.company)
    }

    // in this functio i can integrate the update api and update the data
    const updateProduct = async () => {
        console.warn(name, price, category, company);
        let result = await fetch(`http://localhost:5000/get-product/${params.id}`, {
            method: 'put',
            body: JSON.stringify({ name, price, category, company }),
            headers: {
                "Content-Type": "application/json",
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        console.log(result);
        navigate('/');
    }

    return (
        <div className="product">
            <h1>Update Product</h1>
            <input type="text" placeholder="Enter Product Name" className="inputBox"
                value={name} onChange={(e) => { setName(e.target.value) }}
            />

            <input type="text" placeholder="Enter Product Price" className="inputBox"
                value={price} onChange={(e) => { setPrice(e.target.value) }}
            />

            <input type="text" placeholder="Enter Product Category" className="inputBox"
                value={category} onChange={(e) => { setCategory(e.target.value) }}
            />

            <input type="text" placeholder="Enter Product Company" className="inputBox"
                value={company} onChange={(e) => { setCompany(e.target.value) }}
            />
            <button onClick={updateProduct} type="button" className="Appbutton"> Update Product</button>
        </div>
    )
}

export default UpdateProduct;