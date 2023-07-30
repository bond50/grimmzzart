import React from 'react';
import './404.css'
import {Link} from "react-router-dom";
const ErrorPage = () => {
    return (
        <section className='section error-404 min-vh-100 d-flex flex-column align-items-center justify-content-center'>
            <h1>Whoops!</h1>
            <h2>We couldn't find what you were looking for.</h2>
            <Link className="btn" to="/">Go back to home page</Link>
            <img src="/error/404.jpg" className="img-fluid py-5" alt="Page Not Found"/>

        </section>

    );
};

export default ErrorPage;