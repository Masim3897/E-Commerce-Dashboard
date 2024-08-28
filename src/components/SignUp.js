import React, { useState, useEffect } from "react";
import { json, useNavigate } from "react-router-dom";

const SignUp = () => {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();

    // useEffect sa hm check kry ga ka agr user 
    // localstorage ma exist krta ha to 
    // signup page par jana ki ijazat na do baki sb par ja sakta ha
    // hm jb signup par click krna ki koshish kry
    //  ga to wo hmy home page par navigate krwa da ga
    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/');
        }
    }, []);


    // this function integrate with node js api 
    const DataCollection = async () => {
        console.log(name, email, password);
        let result = await fetch('http://localhost:5000/register', {
            method: 'post',
            body: JSON.stringify({ name, email, password }),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        result = await result.json();
        console.log(result);
        localStorage.setItem("user", JSON.stringify(result.result)); // data save into local storage
        localStorage.setItem("token", JSON.stringify(result.auth));
        if (result) {
            navigate('/')
        }

    }

    return (
        <div className="register">
            <h1>Register</h1>
            <input className="inputBox" type="text"
                value={name} onChange={(e) => setName(e.target.value)}
                placeholder="Enter Name" />

            <input className="inputBox" type="text"
                value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email" />

            <input className="inputBox" type="password"
                value={password} onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password" />

            <button onClick={DataCollection} className="Appbutton" type="button">Sign Up</button>
        </div>
    )
}

export default SignUp;