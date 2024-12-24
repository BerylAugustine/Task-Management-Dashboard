import React from 'react'
import '../css/Footer.css'
import { Typography } from "antd";
import { CopyrightOutlined } from '@ant-design/icons';


const Footer = () => {
  const currentYear = new Date().getFullYear()
  return (
    <div className='footer'>
      <Typography.Link href='#'>Task Management Dashboard <CopyrightOutlined /> {currentYear}  created by Beryl</Typography.Link>
    </div>
  )
}

export default Footer
