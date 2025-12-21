import axios from 'axios';
import React from 'react';

 const instance = axios.create({
    baseURL: 'https://digital-life-lesson-server-eta.vercel.app'
 })

const useAxios = () => {

    
    return instance;
};

export default useAxios;