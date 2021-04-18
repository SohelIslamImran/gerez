import axios from 'axios';
import React, { useContext } from 'react';
import { Button, Col, Form } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { UserContext } from '../../../App';

const Review = () => {
    const { loggedInUser } = useContext(UserContext);
    const { register, handleSubmit } = useForm();

    const onSubmit = data => {
        data.img = loggedInUser.photo || "https://i.ibb.co/5GzXkwq/user.png";

        axios.post('https://gerez-server.herokuapp.com/addReview', data)
            .then(res => res.data && console.log("Successfully Added"))
            .catch(error => console.log(error));
    }

    return (
        <div>
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
                            <Form.Label style={{ fontWeight: "bold" }}>Address</Form.Label>
                            <Form.Control
                                className="shadow-none"
                                style={{ maxWidth: "260px" }}
                                type="text"
                                {...register("address", { required: true })}
                                placeholder="Address" />
                        </Form.Group>
                        <Form.Group as={Col} md={5} sm={12} className="mr-md-5">
                            <Form.Label style={{ fontWeight: "bold" }}>Description</Form.Label>
                            <Form.Control className="shadow-none"
                                style={{ height: "8rem" }}
                                type="text"
                                as="textarea"
                                {...register("description", { required: true })}
                                placeholder="Description" />
                        </Form.Group>
                    </Form.Row>
                </div>
                <div className="text-right mt-4" style={{ marginRight: "12rem" }}>
                    <Button type="submit" className="shadow-none">
                        Submit
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default Review;