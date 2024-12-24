import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import MainLayout from '../pages/MainLayout'
import AddTask from '../pages/AddTask'
import TaskUpload from '../pages/TaskUpload'
import UpdateTask from '../pages/UpdateTask'
import Login from '../pages/Login'
import SignUp from '../pages/Signup'

const AppRoutes = () => {

    return (
        <Routes>

            <Route path='/' element={<Dashboard />}></Route>
            <Route path='/dashboard' element={<Dashboard />}></Route>
            <Route path='/mainlayout' element={<MainLayout />}></Route>
            <Route path='/addtask' element={<AddTask />}></Route>
            <Route path='/taskupload' element={<TaskUpload />}></Route>
            <Route path='/updatetask' element={<UpdateTask />}></Route>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
        </Routes>
    )
}

export default AppRoutes
