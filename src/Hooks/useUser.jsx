import React from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useUser = () => {

    const { user,loading } = useAuth()
    const axiosSecure = useAxiosSecure()
  
    const {data = {} ,isLoading} = useQuery({
        queryKey: ['user', user?.email],
        enabled: !!user?.email ,
        queryFn: async () => {
         const res = await axiosSecure.get(`/users/${user?.email}/user`)
         return res.data
        },
    })
    const {role,isPremium,name,email,photo} = data


    return {role,isPremium,name,email,photo,isLoading};
};

export default useUser;