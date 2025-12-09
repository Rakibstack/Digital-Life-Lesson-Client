import React from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useUser = () => {

    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()

    const {data = {} } = useQuery({
        queryKey: ['user', user?.email],
        queryFn: async () => {
         const res = await axiosSecure.get(`/users/${user?.email}/user`)
         return res.data
        },
    })
    const {role,isPremium,name,email} = data

    return {role,isPremium,name,email};
};

export default useUser;