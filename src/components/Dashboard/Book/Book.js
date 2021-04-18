import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Form } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { UserContext } from '../../../App';
import Payment from '../Payment/Payment';

const Book = () => {
    const { loggedInUser, selectedService } = useContext(UserContext);
    const [services, setServices] = useState([]);
    const [serviceData, setServiceData] = useState(null);
    const { register, handleSubmit } = useForm();

    useEffect(() => {
        axios.get('https://gerez-server.herokuapp.com/services')
            .then(res => setServices(res.data))
            .catch(error => console.log(error))
    }, [])

    const onSubmit = data => {
        const serviceInfo = services.find(service => service.title === data.service);
        delete serviceInfo._id
        data.payWith = "Credit Card";
        data.status = "Pending";
        setServiceData({ ...data, ...serviceInfo });
    }

    const handlePayment = paymentId => {
        const oderDetails = {
            ...serviceData,
            paymentId,
            orderTime: new Date().toLocaleString()
        };

        axios.post('https://gerez-server.herokuapp.com/addOrder', oderDetails)
            .then(res => res.data && console.log("Successfully Added"))
            .catch(error => console.log(error));
    };

    console.log(selectedService.title);

    return (
        <div>
            { serviceData ?
                <div className="ml-md-5 mt-5 pl-md-5 pt-5">
                    <p style={{ fontWeight: 'bold' }}>Your Service charged will be ${selectedService.price || serviceData.price}</p>
                    <h4>Pay with Credit Card</h4>
                    <Payment handlePayment={handlePayment} />
                </div>
                :
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <div className="p-5 mx-md-5 mt-5 bg-white" style={{ borderRadius: "15px", maxWidth: '85rem' }}>
                        <Form.Row>
                            <Form.Group as={Col} md={5} sm={12} className="mr-md-5">
                                <Form.Label style={{ fontWeight: "bold" }}>Your Name</Form.Label>
                                <Form.Control
                                    className="shadow-none"
                                    type="text"
                                    defaultValue={loggedInUser.name}
                                    {...register("name", { required: true })}
                                    placeholder="Your Name" />
                            </Form.Group>
                            <Form.Group as={Col} md={5} sm={12}>
                                <Form.Label style={{ fontWeight: "bold" }}>Email</Form.Label>
                                <Form.Control
                                    className="shadow-none"
                                    type="text"
                                    defaultValue={loggedInUser.email}
                                    {...register("email", { required: true })}
                                    placeholder="Email Address" />
                            </Form.Group>
                            <Form.Group as={Col} md={5} sm={12}>
                                <Form.Label style={{ fontWeight: "bold" }}>Service</Form.Label>
                                <Form.Control
                                    className="shadow-none"
                                    as="select"
                                    defaultValue={selectedService.title || services[0]?.title}
                                    {...register("service", { required: true })}>
                                    {
                                        services.map(service => <option value={service.title} key={service._id}>{service.title}</option>)
                                    }
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>
                    </div>
                    <div className="text-right mt-4" style={{ marginRight: "12rem" }}>
                        <Button type="submit" className="shadow-none px-4 py-2">
                            Check out
                        </Button>
                    </div>
                </Form>}
        </div>
    );
};

export default Book;