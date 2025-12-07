import React from 'react';
import { Outlet } from 'react-router';
import Navber from '../Component/Navber/Navber';
import Footer from '../Component/Footer/Footer';

const HomeLayout = () => {


    return (
        <div>
            <Navber></Navber>
            <Outlet>
                
            </Outlet>
            <Footer></Footer>
            
        </div>
    );
};

export default HomeLayout;