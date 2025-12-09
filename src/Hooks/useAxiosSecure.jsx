import axios from 'axios';
import React, { useEffect } from 'react';
import useAuth from './useAuth';

  const axiosInstance = axios.create({

    baseURL: 'http://localhost:3000'
  })

const useAxiosSecure = () => {

    const {user,logout} = useAuth()

  useEffect(() => {

    const requestInstance =  axiosInstance.interceptors.request.use(config => {
        config.headers.authorization = `Bearer ${user?.accessToken}`
        return config
    })

  const responseInstance = axiosInstance.interceptors.response.use(res => {

       return res;
    },error => {

       const status =error?.response?.status
       if(status === 401 || status === 403){
        logout()
         return Promise.reject('unauthorized Access')

       }
       return Promise.reject(error)
    })

    return () => {
        axiosInstance.interceptors.request.eject(requestInstance);
        axiosInstance.interceptors.response.eject(responseInstance)
    }
  },[user?.accessToken,logout])

    return axiosInstance;
};

export default useAxiosSecure;