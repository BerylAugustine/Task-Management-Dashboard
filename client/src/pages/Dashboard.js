import React, { useState, useEffect } from "react";
import { Table, Tag, Dropdown, Menu, Button } from "antd";
import { DeleteOutlined, SearchOutlined, FilterOutlined, PlusOutlined } from "@ant-design/icons";
import "../css/Dashboard.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TaskUpoad from "./TaskUpload.js";
import UpdateTask from "./UpdateTask.js";
import Footer from "../components/Footer.js";
import { blue, green, red } from '@ant-design/colors';
import { Flex, Progress } from 'antd';
import { Avatar, Badge, Space } from 'antd';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { setPriorityFilter, selectPriorityFilter } from '../Redux/filterSlice.js'; // Import Redux action and selector

const Dashboard = () => {
    const [posts, setPosts] = useState([]);
    const [textBox, setTextBox] = useState([]);
    const [isGreater, setIsGreater] = useState(false);
    const [isUpload, setisUpload] = useState(false);
    const [isUpdate, setisUpdate] = useState(false);
    const [uploadPost, setUploadPost] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [userData, setUserData] = useState(null); // New state to store user data

    const priorityFilter = useSelector(selectPriorityFilter); // Get the priority filter from Redux state
    const dispatch = useDispatch(); // Get the dispatch function to send actions
    const navigate = useNavigate();

    // Function to fetch user data using the token from localStorage
    const fetchUserData = async () => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            return;  // Handle case where token is missing, e.g., redirect to login
        }

        try {
            const response = await axios.get('http://localhost:8000/api/some-protected-route', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUserData(response.data);  // Store the user data in state
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    // Fetch posts from the server
    const fetchPosts = async () => {
        const response = await axios.get("http://localhost:8000/api/fetch");
        setPosts(response.data);
    };

    // Fetch user data when the component mounts
    useEffect(() => {
        fetchPosts();
        fetchUserData(); // Fetch user data
    }, []);

    // Filter the posts based on the priority selected
    const filteredPosts = posts.filter((post) => {
        const matchesPriority = priorityFilter === 'All' || post.checkVal.includes(priorityFilter);
        const matchesSearchQuery = post.TaskName.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesPriority && matchesSearchQuery;
    });

    const handleUpload = (id) => {
        const updatedPost = posts.filter((post) => post._id === id);
        setUploadPost(updatedPost);
        setisUpload(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure want to Delete")) {
            await axios.delete("http://localhost:8000/api/delete/" + id);
        }
        const updatedPosts = posts.filter((post) => post._id !== id);
        setPosts(updatedPosts);
    };

    const handleUpdate = (id) => {
        const updatedPost = posts.filter((post) => post._id === id);
        setUploadPost(updatedPost);
        setisUpdate(true);
    };

    const handleFilter = (priority) => {
        dispatch(setPriorityFilter(priority));
    };

    const handleCreate = () => {
        navigate('/addtask')
    };

    const columns = [
        {
            title: "S.NO",
            dataIndex: "_id",
            key: "_id",
            render: (_, __, index) => <>{index + 1}</>
        },
        {
            title: "Task Name",
            dataIndex: "TaskName",
            key: "TaskName",
            render: (text) => <div>{text}</div>,
        },
        {
            title: "Description",
            dataIndex: "AboutTask",
            key: "AboutTask",
            render: (text) => <div>{text}</div>,
        },
        {
            title: "Priority",
            key: "checkVal",
            dataIndex: "checkVal",
            render: (_, { checkVal }) => (
                <>
                    {checkVal.map((tag) => {
                        let color = tag === "Medium" ? 'geekblue' : 'green';
                        if (tag === 'High') {
                            color = 'volcano';
                        }
                        return <Tag color={color} key={tag}>{tag.toUpperCase()}</Tag>;
                    })}
                </>
            ),
        },
        {
            title: "Start Date",
            dataIndex: "StartDate",
            key: "StartDate",
            render: (StartDate) => <div>{moment(StartDate).utc().format('DD/MM/YY')}</div>,
        },
        {
            title: "Due Date",
            dataIndex: "DueDate",
            key: "DueDate",
            render: (DueDate) => <div>{moment(DueDate).utc().format('DD/MM/YY')}</div>,
        },
        {
            title: "Action",
            key: "action",
            dataIndex: "_id",
            render: (id) => (
                <>
                    <button className="uploadbtn" onClick={() => handleUpload(id)}>Upload</button>
                    <button className="deletebtn" onClick={() => handleDelete(id)}><DeleteOutlined /></button>
                    <button className="updatebtn" onClick={() => handleUpdate(id)}>Update</button>
                </>
            ),
        },
        {
            title: "Project Status",
            key: "action",
            dataIndex: "status",
            render: (status) => (
                <Flex gap="small" vertical>
                    <Progress percent={status} steps={6} strokeColor={[green[3], green[3], green[2], green[2], red[1], red[1]]} />
                </Flex>
            ),
        },
        {
            title: "Estimation (Days)",
            key: "estimation",
            dataIndex: "DueDate",
            render: (DueDate, record) => {
                const daysLeft = calculateDaysLeft(DueDate);
                const isOverdue = daysLeft < 0;
                return (
                    <div>
                        {record.status == 100 ? (
                            <div className="textBox">Successfully completed</div>
                        ) : isOverdue ? (
                            <Badge count="OVERDUE" style={{ backgroundColor: red[4] }}>
                                <div className="daysBox">{daysLeft}</div>
                            </Badge>
                        ) : (
                            <div className="daysBox">{daysLeft}</div>
                        )}
                    </div>
                );
            },
        }
    ];

    const calculateDaysLeft = (DueDate) => {
        const firstDate = new Date();
        const secondDate = new Date(DueDate);
        const firstDateInMs = firstDate.getTime();
        const secondDateInMs = secondDate.getTime();
        const differenceBtwDates = secondDateInMs - firstDateInMs;
        const aDayInMs = 24 * 60 * 60 * 1000;
        return Math.round(differenceBtwDates / aDayInMs);
    }

    const filterMenu = (
        <Menu>
            <Menu.Item onClick={() => handleFilter('High')}>High Priority</Menu.Item>
            <Menu.Item onClick={() => handleFilter('Medium')}>Medium Priority</Menu.Item>
            <Menu.Item onClick={() => handleFilter('Low')}>Low Priority</Menu.Item>
            <Menu.Item onClick={() => handleFilter('All')}>Clear Filter</Menu.Item>
        </Menu>
    );

    return (
        <div>
            {(!isUpload && !isUpdate) ? (
                <>
                    <div className="Task-container">
                        <p className="TaskList">Task List</p>
                        <div className="list">
                            <span className="filteroutline" onClick={handleCreate}>
                                <Button className="create"><PlusOutlined />Create</Button>
                            </span>
                            <span className="filteroutline">
                                <Dropdown overlay={filterMenu} trigger={['click']} className="filter">
                                    <Button><FilterOutlined /> Filter</Button>
                                </Dropdown>
                            </span>
                            <span className="searchInput">
                                <SearchOutlined />
                                <input
                                    className="search"
                                    placeholder="Search..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)} // Update search query
                                />
                            </span>
                        </div>
                        <Table columns={columns} dataSource={filteredPosts} className="table" />
                    </div>
                </>
            ) : (!isUpload && isUpdate) ? (
                <UpdateTask uploadPost={uploadPost} />
            ) : (isUpload && !isUpdate) ? (
                <TaskUpoad uploadPost={uploadPost} />
            ) : navigate('/dashboard')}

        </div>
    );
}

export default Dashboard;
