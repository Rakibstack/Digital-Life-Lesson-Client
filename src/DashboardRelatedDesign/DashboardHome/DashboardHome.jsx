import React from 'react';
import useUser from '../../Hooks/useUser';
import DynamicLoading from '../../Component/Loading/Loading';
import AdminDashboard from './AdminDashboard';
import UserDashoard from './UserDashoard';

const DashboardHome = () => {

    const {role,isLoading} = useUser()

    if(isLoading){
        return <DynamicLoading></DynamicLoading>
    }

        if(role === 'admin'){
            return <AdminDashboard></AdminDashboard>
        }else{
            return <UserDashoard></UserDashoard>
        }
   
};

export default DashboardHome;