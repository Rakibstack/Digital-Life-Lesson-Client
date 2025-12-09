import React from 'react';
import useUser from '../../Hooks/useUser';

const Upgrade = () => {

     const{role,isPremium} = useUser()
     
    console.log(role,isPremium);
    return (
        <div>
            okkkkkkkk
        </div>
    );
};

export default Upgrade;