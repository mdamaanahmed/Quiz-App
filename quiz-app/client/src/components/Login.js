import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';
import { AppContext } from "./AppContext";

const Login = () => {
    const { setType } = useContext(AppContext);
    const history = useHistory();
    const [loginData, setLoginData] = useState({
        userName: "",
        password: ""
    });

    const getLoginData = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setLoginData({ ...loginData, [name]: value })
    }

    const handleQuestionTypeData = (e) => {
        axios.post("http://localhost:8200/api/retrive/question-type/")
            .then(res => {
                // console.log(res);
                localStorage.setItem("questionType", JSON.stringify(res.data));
                const questionType = JSON.parse(localStorage.getItem("questionType"));
                setType(questionType);
                history.push("/question-type");
            })
            .catch(err => console.log(err));
    }

    const handleLoginData = () => {
        axios.post("http://localhost:8200/api/retrive/login/", { loginData })
            .then(res => {
                console.log(res);
                if (res.data.msg === "Invalide Credencials")
                    alert("Invalide Credencials");
                else {
                    localStorage.setItem("token", res.data.token);
                    handleQuestionTypeData()
                }
            })
            .catch(err => console.log(err));
    }

    return (
        <>
        <div className="login-container">
            <div className='login'>
                <h1>Login</h1>
                <label htmlFor="name">User Name:</label>
                <input type="text" id='name' onChange={(e) => getLoginData(e)} name='userName' />
                <label htmlFor="password">password:</label>
                <input type="password" id='password' onChange={(e) => getLoginData(e)} name='password' />
                <button onClick={handleLoginData}>submit</button>
            </div>
        </div>
        </>
    )
}

export default Login;