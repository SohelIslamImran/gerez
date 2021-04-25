import React from 'react';
import { Image } from 'react-bootstrap';
import spinner from '../../../images/loadingSpinner.svg';

const LoadingSpinner = () => {
    return (
        <section className="vh-100 vw-100 d-flex justify-content-center align-items-center">
            <Image src={spinner} />
        </section>
    );
};

export default LoadingSpinner;