import Navbar from '../components/Navbar'
import Content from '../pages/Content'
import '../css/MainLayout.css'
import  Footer from '../components/Footer';

function MainLayout() {

    return (
        <div className="App">
            <Navbar />
            <Content className="pageContent">
            </Content>
            <Footer/>
        </div>
    );
}

export default MainLayout;









// import React, { useContext, useState, useEffect } from "react";
// import "../css/MainLayout.css";
// import { Space } from "antd";
// import Header from "../components/Header.js";
// import { useNavigate } from 'react-router-dom'
// import { LoginContext } from "../context/LoginContext";
// import axios from 'axios'
// import Sidemenu from "../components/Sidemenu.js";
// import Content from "./Content.js";

// import Dashboard from "./Dashboard.js";
// import Footer from "../components/Footer";
// import LoginPage from "./Login.js";

// function MainLayout() {

//     const [message, setMessage] = useState()
//     const navigate = useNavigate()
//     // const [isLoggedin, setisLoggedin] = useState(true);

//     axios.defaults.withCredentials = true;
//     useEffect(() => {
//         axios.get("http://localhost:8000/api/mainlayout")
//             .then(res => {
//                 if (res.data.valid) {
//                     setMessage(res.data.message)
//                     // setisLoggedin(false)
//                 } else {
//                     navigate(<LoginPage/>)
//                 }
//             })
//             .catch(err => console.log(err))
//     }, [])

//     // const { isLoggedin } = useContext(LoginContext);
//     return (
//         // isLoggedin ? (
//         //     <LoginPage />
//         // ) : (

//         <div className="MainLayout">
//             <Header />
//             <Space>
//                 <Sidemenu className="sideContent"></Sidemenu>
//                 <Content className="pageContent">
//                     <Dashboard />
//                 </Content>
//             </Space>
//             <Footer />
//         </div>
//     )
// }

// export default MainLayout;
