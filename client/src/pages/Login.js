import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Checkbox, Form, Input } from 'antd';
import '../css/Login.css';

const Login = () => {
    const [userVal, setUserVal] = useState({
        email: "",
        password: "",
    });
    const [errorMessage, setErrorMessage] = useState("");  // State to store error message

    const navigate = useNavigate();

    const handleLogin = (e) => {
        const { name, value } = e.target;
        setUserVal(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (values) => {
        try {
            const { email, password } = values;
            const response = await axios.post('http://localhost:8000/api/login', { email, password });
            const accessToken = response.data.token;

            // Clear any previous error messages if login is successful
            setErrorMessage("");

            localStorage.setItem('accessToken', accessToken);  // Save token to local storage
            navigate('/dashboard');
        } catch (error) {
            console.log('Login Error', error);
            setErrorMessage('Invalid credentials, please try again.');  // Set error message on failure
        }
    };

    return (
        <div className="loginpage">
            <div className='loginBox'>
                <div className='logintext'><h2>LogIn</h2></div>
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={handleSubmit}
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input name="email" onChange={handleLogin} />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password name="password" onChange={handleLogin} />
                    </Form.Item>
                    {/* Render error message if there is any */}
                    {errorMessage && (
                        <div style={{ color: 'red', textAlign: 'end', marginTop:-30 }}>
                            {errorMessage}
                        </div>
                    )}

                    <Form.Item name="remember" valuePropName="checked" label={null}>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item label={null}>
                        <Button type="primary" htmlType="submit">Submit</Button>
                    </Form.Item>

                </Form>
            </div>
        </div>
    );
};

export default Login;
