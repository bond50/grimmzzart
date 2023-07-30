import React from 'react';

const AccessDenied = ({message,}) => {



    return (
        <section className=''>
            <h5>{message ? message : 'You dont have permission to access this page'}</h5>
        </section>
    );
};

export default AccessDenied;
