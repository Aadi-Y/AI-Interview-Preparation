import React from 'react'
import { UserContext } from "../Context/UserProvider";
import { useContext } from "react";
import Navbar from './Navbar';

function DashboardLayout({children}) {
    const {user} = useContext(UserContext);
  return (
    <div >
        <Navbar/>

        <div>{children}</div>
    </div>
  )
}

export default DashboardLayout;