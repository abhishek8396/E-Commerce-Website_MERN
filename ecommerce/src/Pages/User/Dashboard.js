import React from 'react'
import Layout from '../../Component/Layout/Layout'
import UserMenu from '../../Component/Layout/UserMenu'
import { useAuth } from '../../Context API/Auth'
const Dashboard = () => {
  const [auth]= useAuth()
  return (
    <Layout>
        <div className='container-flui p-3 m-3'>
        <div className='row'>
            <div className='col-md-3'>
                <UserMenu/>
            </div>
            <div className='col-md-8'>
                <div className='card w-75 p-3'>
                  <h3>Name: {auth?.user?.name}</h3>
                  <h3>Email: {auth?.user?.email}</h3>
                  <h3>Contact No: {auth?.user?.phone}</h3>
                  <h3>Address: {auth?.user?.address}</h3>
                </div>
            </div>
        </div>
      </div>
    </Layout>
  )
}

export default Dashboard