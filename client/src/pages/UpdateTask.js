import React, { useState, useEffect } from "react";
import "../css/AddTask.css";
import logo from "../assets/logo.png";
import axios from "axios";
import { Button, DatePicker, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { Checkbox, Col, Row, Radio } from "antd";
import Dashboard from "./Dashboard";


const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 10,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 15,
        },
    },
};

const UpdateTask = (uploadPost) => {
    console.log(uploadPost);
    const [isUpdate, setisUpdate] = useState(false);
    const [details, setDetails] = useState({
        TaskName: "",
        // AssignmentID: "",
        AboutTask: "",
        checkVal: [],
        DueDate: "",
        status: ""
    });

    const navigate = useNavigate();
    const dateFormat = "YYYY/MM/DD";

    const handleUpdate = async (id) => {
        navigate("/dashboard");
        let { TaskName, AboutTask, DueDate, checkVal, status } = details;
        await axios
            .post(
                ("http://localhost:8000/api/update/" + uploadPost.uploadPost[0]._id),
                {
                    TaskName, AboutTask, DueDate, checkVal, status
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            .then((res) => {
                alert("Data Posted Successfully");
                console.log(res);
                setisUpdate(true)
            })
            .catch((err) => console.log(err));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDetails((prev) => {
            return { ...prev, [name]: value };
        });
    };
    const onChangeCheck = (checkedValues) => {
        console.log("checked = ", checkedValues);
        setDetails((prev) => {
            return { ...prev, ["checkVal"]: checkedValues };
        });
    };

    const onChangeRadio = (e) => {
        console.log("Selected priority = ", e.target.value);
        setDetails((prev) => {
            return { ...prev, checkVal: e.target.value };
        });
    };

    const handleDateChange = (e) => {
        setDetails((prev) => {
            return { ...prev, ["DueDate"]: e.toString() };
        });
    };

    return (
        !isUpdate?(
        <div className="addContainer">
            <div className="selectContent">
                <h2>UPDATE TASK</h2>
                <>
                    <Form
                        {...formItemLayout}
                        variant="outlined"
                        style={{
                            maxWidth: 900,
                            marginTop: 40,
                        }}
                    >
                        <Form.Item
                            label="Task Name"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input!",
                                },
                            ]}
                        >
                            <Input name="TaskName" onChange={handleChange} placeholder="Enter task name" />
                        </Form.Item>

                        <Form.Item
                            label="Assigned To"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input!",
                                },
                            ]}
                        >
                            <Input name="AssignedTo" onChange={handleChange} placeholder="Enter Name" />
                        </Form.Item>

                        {/* <Form.Item
                        label="Assignment ID"
                        name="AssignmentID"
                        rules={[
                            {
                                required: true,
                                message: "Please input!",
                            },
                        ]}
                    >
                        <Input
                            type="number"
                            style={{
                                width: "100%",
                            }}
                            name="AssignmentID"
                            onChange={handleChange}
                        />
                    </Form.Item> */}

                        <Form.Item
                            label="About Task"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input!",
                                },
                            ]}
                        >
                            <Input.TextArea name="AboutTask" onChange={handleChange} placeholder="Enter Task Details..." />
                        </Form.Item>

                        <Form.Item
                            label="Completion Status %"
                            name="status"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input!",
                                },
                            ]}
                        >
                            <Input
                                type="number"
                                style={{
                                    width: "100%",
                                }}
                                name="status"
                                onChange={handleChange}
                            />
                        </Form.Item>


                        <Form.Item
                            label="Priority"
                            name="checkVal"
                            rules={[{ required: true, message: "Please select!" }]}
                        >
                            <Radio.Group onChange={onChangeRadio} value={details.checkVal}>
                                <Row>
                                    <Col span={8}>
                                        <Radio value="Low">Low</Radio>
                                    </Col>
                                    <Col span={8}>
                                        <Radio value="High">High</Radio>
                                    </Col>
                                    <Col span={8}>
                                        <Radio value="Medium">Medium</Radio>
                                    </Col>
                                </Row>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item
                            label="Due Date"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input!",
                                },
                            ]}
                        >
                            <DatePicker
                                type="number"
                                name="DueDate"
                                onChange={handleDateChange}
                            />
                        </Form.Item>

                        <Form.Item
                            wrapperCol={{
                                offset: 12,
                                span: 16,
                            }}
                        >
                            <Button type="primary" onClick={handleUpdate}>
                                Update
                            </Button>
                        </Form.Item>
                    </Form>
                </>
                {/* <img src={logo} alt="Image" className="image" /> */}
                {/* )} */}
            </div> </div>):<Dashboard/>
    );
};
export default UpdateTask;
