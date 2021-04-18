import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import SplitCardForm from './SplitCardForm';

const stripePromise = loadStripe('pk_test_51Ie33uCljQ1lWJFNhmzcstvqqVDr07o9lhLNTrHtGtIqZ2XVyaT1PdijIb0nX2Wyj6RNJ56ipbI7AKhGG6DPRYsv003m5nQO7F');

const Payment = ({ handlePayment }) => {
    return (
        <div>
            <Elements stripe={stripePromise}>
                <div className="split-form">
                    <SplitCardForm handlePayment={handlePayment} />
                </div>
            </Elements>
        </div>
    );
};

export default Payment;