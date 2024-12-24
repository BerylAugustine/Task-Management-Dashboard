import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Checkbox, Flex, Form, Input, message } from 'antd';
import '../css/signup.css';

function SignUp() {
    const [userVal, setUserVal] = useState({
        username: '',
        password: '',
        email: '',
    });

    const [error, setError] = useState(null); // To store error messages
    const navigate = useNavigate();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        axios
            .get('http://localhost:8000/api/register')
            .then((res) => {
                console.log(res.data);
            });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        let { username, password, email } = userVal;

        // Reset any previous errors
        setError(null);

        axios
            .post('http://localhost:8000/api/register', { email, username, password })
            .then(() => {
                message.success('Registration Successful');
                fetchUsers();
                navigate('/login');
            })
            .catch((error) => {
                // Check if it's an email already exists error
                if (error.response && error.response.data.error) {
                    setError(error.response.data.error); // Set error message
                } else {
                    console.log('Unable to register user');
                    message.error('An error occurred while registering');
                }
            });
    };

    const handleSignUp = (e) => {
        setUserVal((prev) => {
            const { name, value } = e.target;
            return {
                ...prev,
                [name]: value,
            };
        });
    };

    return (
        <div className="signinpage">
            <div className="signinBox">
                <div className="heading">
                    <h2>Sign Up</h2>
                </div>
                <h3 className="logintext">Learn the comfort of your own home</h3>

                <Form
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: 600,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={handleSubmit} // Directly call handleSubmit
                    autoComplete="off"
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input name="username" onChange={handleSignUp} />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email!',
                            },
                            {
                                type: 'email',
                                message: 'Please enter a valid email!',
                            },
                        ]}
                    >
                        <Input name="email" onChange={handleSignUp} />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password name="password" onChange={handleSignUp} />
                    </Form.Item>

                    {error && <div style={{ color: 'red', marginBottom: '15px', marginTop:'-20px',display:'flex',justifyContent:'center' }}>{error}</div>} {/* Display error message */}

                    <Form.Item name="remember" valuePropName="checked" label={null}>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item label={null}>
                        <Button type="primary" htmlType="submit" onClick={handleSubmit}>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}

export default SignUp;
