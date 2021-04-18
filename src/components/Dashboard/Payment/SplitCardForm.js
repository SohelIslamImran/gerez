import {
    CardCvcElement,
    CardExpiryElement,
    CardNumberElement,
    useElements,
    useStripe
} from "@stripe/react-stripe-js";
import React, { useMemo, useState } from "react";
import './SplitCardForm.css';
import useResponsiveFontSize from "./useResponsiveFontSize";

const useOptions = () => {
    const fontSize = useResponsiveFontSize();
    const options = useMemo(
        () => ({
            style: {
                base: {
                    fontSize,
                    color: "#424770",
                    letterSpacing: "0.025em",
                    fontFamily: "Source Code Pro, monospace",
                    "::placeholder": {
                        color: "#aab7c4"
                    }
                },
                invalid: {
                    color: "#9e2146"
                }
            }
        }),
        [fontSize]
    );

    return options;
};

const SplitCardForm = ({ handlePayment }) => {
    const [paymentError, setPaymentError] = useState(null);
    const [paymentSuccess, setPaymentSuccess] = useState(null);
    const stripe = useStripe();
    const elements = useElements();
    const options = useOptions();

    const handleSubmit = async event => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardNumberElement)
        });

        if (error) {
            setPaymentSuccess(null);
            setPaymentError(error.message);
        } else {
            setPaymentError(null);
            setPaymentSuccess(paymentMethod.id);
            handlePayment(paymentMethod.id);
        }
    };

    return (
        <div>
            <form className="card-form" onSubmit={handleSubmit}>
                <label>Card number</label>
                <CardNumberElement options={options} />

                <label>Expiration date</label>
                <CardExpiryElement options={options} />

                <label>CVC</label>
                <CardCvcElement options={options} />

                <button type="submit" disabled={!stripe}>
                    Pay
                </button>
            </form>
            {
                paymentError && <p className="text-danger mt-3">{paymentError}</p>
            }
            {
                paymentSuccess && <p className="text-success mt-3">Payment was successful</p>
            }
        </div>
    );
};

export default SplitCardForm;
