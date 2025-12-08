import React from 'react';
import useAuth from '../../Hooks/useAuth';
import Loading from '../Loading/Loading';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({children}) => {

    const {user,loading} = useAuth()
    const location = useLocation()
    // console.log(location);
    
    if(loading){

        return <Loading></Loading>
    }

    if(user){

     return children
    }

    return <Navigate to='/auth/login'state={location.pathname} ></Navigate>
};

export default PrivateRoute;