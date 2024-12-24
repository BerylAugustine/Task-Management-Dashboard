
import React, { useState} from "react";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload, Button } from "antd";
// import { UploadOutlined } from '@ant-design/icons';
import "../css/TaskUpload.css";
import { useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard";
const { Dragger } = Upload;
const props = {
    name: "file",
    multiple: true,
    action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
    onChange(info) {
        const { status } = info.file;
        if (status !== "uploading") {
            console.log(info.file, info.fileList);
        }
        if (status === "done") {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === "error") {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
    onDrop(e) {
        console.log("Dropped files", e.dataTransfer.files);
    },
};

const TaskUpload = (uploadPost) => {
    const [isUpload, setisUpload] = useState(false);
    console.log(uploadPost);
    const navigate = useNavigate();
    const handleClick = (e) => {
        navigate("/dashboard");
        console.log("button clicked");
        setisUpload(true)
    };
    return (
        !isUpload? <div className="assignment-cont">
            <button className="assignmt">
                Task Name : {uploadPost.uploadPost[0].TaskName}
            </button>
            <h1 className="description">
                Description : {uploadPost.uploadPost[0].AboutTask}
            </h1>
            <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                    Click or drag file to this area to upload
                </p>
                <p className="ant-upload-hint">
                    Support for a single or bulk upload. Strictly prohibited from
                    uploading company data or other banned files.
                </p>
            </Dragger>
            <div className="button">
                <Button type="primary" onClick={handleClick} className="submitBtn">
                    Submit
                </Button>
                <Button type="primary" onClick={handleClick} className="cancelBtn">
                    Cancel
                </Button>
            </div>
        </div>:<Dashboard/>
    );
};
export default TaskUpload;
