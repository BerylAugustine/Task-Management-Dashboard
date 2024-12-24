import React, { useState } from "react";
import "../css/AddTask.css";
import logo from "../assets/logo.png";
import axios from "axios";
import { Button, DatePicker, Form, Input, Select } from "antd";
import { useNavigate } from "react-router-dom";
import { Checkbox, Col, Row, Radio } from "antd";

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

const AddTask = () => {
    const [details, setDetails] = useState({
        TaskName: "",
        AboutTask: "",
        checkVal: [],
        DueDate: "",
        StartDate: "",
        status: ""
    });

    const navigate = useNavigate();
    const dateFormat = "YYYY/MM/DD";


    const handleClick = async (e) => {
        e.preventDefault();
        let { TaskName, AboutTask, DueDate, checkVal, status, StartDate } = details;
        await axios
            .post(
                "http://localhost:8000/api/create",
                {
                    TaskName, AboutTask, DueDate, checkVal, status, StartDate
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
            })
            .catch((err) => console.log(err.response.data)); navigate("/dashboard");
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

    const handleDateChange = (e) => {
        setDetails((prev) => {
            return { ...prev, ["DueDate"]: e.toString() };
        });
    };

    const handleStartDateChange = (e) => {
        setDetails((prev) => {
            return { ...prev, ["StartDate"]: e.toString() };
        });
    };

    const onChangeRadio = (e) => {
        console.log("Selected priority = ", e.target.value);
        setDetails((prev) => {
            return { ...prev, checkVal: e.target.value };
        });
    };


    return (
        <div className="addContainer">
            <div className="selectContent">
                <h2>ADD TASK</h2>
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

                        <Form.Item
                            label="Status %"
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
                                placeholder="Enter Completion Status in %"
                            />
                        </Form.Item>

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
                            label="Start Date"
                            name="StartDate"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input!",
                                },
                            ]}
                        >
                            <DatePicker
                                type="number"
                                name="StartDate"
                                onChange={handleStartDateChange}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Due Date"
                            name="DueDate"
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
                            <Button type="primary" onClick={handleClick}>
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </>
                {/* <img src={logo} alt="Image" className="image" /> */}
            </div></div>
    );
};
export default AddTask;
