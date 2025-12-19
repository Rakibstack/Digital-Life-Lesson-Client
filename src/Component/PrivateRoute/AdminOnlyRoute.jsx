import React from 'react';
import useUser from '../../Hooks/useUser';
import DynamicLoading from '../Loading/Loading';
import ForbiddenAccess from '../Loading/ForbiddenAccess';

const AdminOnlyRoute = ({children}) => {

    const {role,isLoading} = useUser();


    if(isLoading){
        return <DynamicLoading></DynamicLoading>
    }
    
    if(role !== 'admin'){

        return <ForbiddenAccess></ForbiddenAccess>
    }

    return children ;
};

export default AdminOnlyRoute;