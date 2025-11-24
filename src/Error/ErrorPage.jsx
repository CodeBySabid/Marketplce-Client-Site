import React from 'react';
import './error.css'
import { Link } from 'react-router';

const ErrorPage = () => {
    return (
        <div id="notfound">
            <div class="notfound">
                <div class="notfound-404">
                    <h1>404</h1>
                    <h2>Page not found</h2>
                </div>
                <Link to={'/'} target="_blank">Homepage</Link>
            </div>
        </div>

    );
};

export default ErrorPage;