import React from 'react';
import { Outlet } from 'react-router';
import Navber from '../Component/Navber/Navber';

const Authlayout = () => {


    return (
        
        <div>
            <Navber></Navber>
            <Outlet></Outlet>
        </div>
    );
};

export default Authlayout;