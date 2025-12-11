import React from 'react';
import { Outlet } from 'react-router';

const PaymentLayout = () => {
    return (
        <div>
            <Outlet></Outlet>
        </div>
    );
};

export default PaymentLayout;