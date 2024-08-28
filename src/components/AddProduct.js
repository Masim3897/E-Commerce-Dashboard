import React from "react";
import { json,useNavigate } from "react-router-dom";

const AddProduct = () => {
    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [company, setCompany] = React.useState('');
    const [error, setError] = React.useState(false); // for validation
    const navigate = useNavigate();

    const addproduct = async () => {
        // validation check
        if (!name || !price || !category || !company) {
            setError(true)
            return false;
        }

        console.warn(name, price, category, company)
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        let result = await fetch("http://localhost:5000/add-product", {
            method: 'post',
            body: JSON.stringify({ name, price, category, company, userId }),
            headers: {
                "Content-Type": "application/json",
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`

            }
        });

        result = await result.json();
        console.warn(result);
        navigate('/');
    }

    return (
        <div className="product">
            <h1>Add Product</h1>
            <input type="text" placeholder="Enter Product Name" className="inputBox"
                value={name} onChange={(e) => { setName(e.target.value) }}
            />
            {error && !name && <span className="invalid-input">Enter Valid Name</span>}

            <input type="text" placeholder="Enter Product Price" className="inputBox"
                value={price} onChange={(e) => { setPrice(e.target.value) }}
            />
            {error && !price && <span className="invalid-input">Enter Valid Price</span>}

            <input type="text" placeholder="Enter Product Category" className="inputBox"
                value={category} onChange={(e) => { setCategory(e.target.value) }}
            />
            {error && !category && <span className="invalid-input">Enter Valid Category</span>}

            <input type="text" placeholder="Enter Product Company" className="inputBox"
                value={company} onChange={(e) => { setCompany(e.target.value) }}
            />
            {error && !company && <span className="invalid-input">Enter Valid Company</span>}

            <button onClick={addproduct} type="button" className="Appbutton"> Add Product</button>
        </div>
    )
}

export default AddProduct;