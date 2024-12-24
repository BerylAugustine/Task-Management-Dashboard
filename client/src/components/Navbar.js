import React, { useState, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Header } = Layout;

const items1 = ['LogIn', 'SignUp'].map((key) => ({
    key: `/${key.toLowerCase()}`,
    label: `${key}`,
}));

const items2 = ['Logout', 'Dashboard'].map((key) => ({
    key: `/${key.toLowerCase()}`,
    label: `${key}`,
}));

function Navbar() {
    const [isUserSignedIn, setIsUserSignedIn] = useState(!!localStorage.getItem('accessToken'));
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        setIsUserSignedIn(!!token);
    }, []); // Only run once on component mount

    const handleSignOut = (item) => {
        console.log(item);
        if (item.key === '/logout') {
            localStorage.removeItem('accessToken');
            setIsUserSignedIn(false);
            navigate('/login');
        } else {
            navigate(item.key);
        } 
    };

    return (
        <Header style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
            <Menu
                theme="dark"
                mode="horizontal"
                items={isUserSignedIn ? items2 : items1}
                onClick={(item) => handleSignOut(item)}
                style={{ width: '25%', fontSize: "19px" }}
            />
        </Header>
    );
}

export default Navbar;
