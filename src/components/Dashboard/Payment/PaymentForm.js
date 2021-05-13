import {
    CardCvcElement,
    CardExpiryElement,
    CardNumberElement,
    useElements,
    useStripe
} from '@stripe/react-stripe-js';
import axios from 'axios';
import React, { useContext, useMemo } from 'react';
import { Button, Col, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import swal from 'sweetalert';
import { UserContext } from '../../../App';

const useOptions = () => {
    const options = useMemo(() => ({
        style: {
            base: {
                fontSize: "1.2rem",
                lineHeight: "2",
                color: "#495057",
                letterSpacing: "0.025em",
                "::placeholder": {
                    color: "#aab7c4"
                }
            },
            invalid: {
                color: "#9e2146"
            }
        }
    }), []);
    return options;
};

const PaymentForm = ({ serviceInfo }) => {
    const { loggedInUser: { name, email } } = useContext(UserContext);
    const stripe = useStripe();
    const elements = useElements();
    const options = useOptions();
    const { register, handleSubmit } = useForm();

    const onSubmit = async data => {
        if (!stripe || !elements) {
            return;
        }
        const loading = toast.loading('Please wait...!');

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardNumberElement)
        });

        if (error) {
            toast.dismiss(loading);
            return swal("Failed!", error.message, "error", { dangerMode: true });
        }

        delete serviceInfo._id;
        serviceInfo.service = serviceInfo.title;
        data.payWith = "Credit Card";
        data.status = "Pending";

        const orderDetails = {
            ...data,
            ...serviceInfo,
            paymentId: paymentMethod.id,
            orderTime: new Date().toLocaleString()
        };

        axios.post('https://gerez-server.herokuapp.com/addOrder', orderDetails)
            .then(res => {
                toast.dismiss(loading);
                if (res.data) {
                    return swal("Payment successful", "Your booking and payment has been successful.", "success");
                }
                swal("Failed!", "Something went wrong! Please try again.", "error", { dangerMode: true });
            })
            .catch(error => {
                toast.dismiss(loading);
                swal("Failed!", "Something went wrong! Please try again.", "error", { dangerMode: true });
            });
    }

    return (
        <section>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-main" style={{ borderRadius: "15px", maxWidth: '85rem' }}>
                    <Form.Row>
                        <Col md={6} xs={12} className="pr-md-4">

                            <Form.Group>
                                <Form.Label style={{ fontWeight: "bold" }}>Your Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    defaultValue={name}
                                    {...register("name", { required: true })}
                                    placeholder="Your Name" />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label style={{ fontWeight: "bold" }}>Email</Form.Label>
                                <Form.Control
                                    type="text"
                                    defaultValue={email}
                                    {...register("email", { required: true })}
                                    placeholder="Email Address" />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label style={{ fontWeight: "bold" }}>Address</Form.Label>
                                <Form.Control
                                    type="text"
                                    {...register("address", { required: true })}
                                    placeholder="Address" />
                            </Form.Group>
                        </Col>

                        <Col md={6} xs={12} className="pl-md-4">
                            <div>
                                <Form.Label style={{ fontWeight: "bold" }}>Card Number</Form.Label>
                                <CardNumberElement className="form-control" options={options} />
                            </div>
                            <div className="mt-3">
                                <Form.Label style={{ fontWeight: "bold" }}>Expiration Date</Form.Label>
                                <CardExpiryElement className="form-control" options={options} />
                            </div>
                            <div className="mt-3">
                                <Form.Label style={{ fontWeight: "bold" }}>CVC</Form.Label>
                                <CardCvcElement className="form-control" options={options} />
                            </div>
                        </Col>

                    </Form.Row>
                </div>

                <div className="text-center mt-4">
                    <Button type="submit" className="btn-main" disabled={!stripe} style={{ padding: ".68rem 2rem" }}>
                        Pay Now
                    </Button>
                </div>
            </Form>
        </section>
    );
};

export default PaymentForm;