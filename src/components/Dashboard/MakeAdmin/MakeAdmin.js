import axios from 'axios';
import React, { useContext } from 'react';
import { Button, Col, Form } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { UserContext } from '../../../App';
import swal from 'sweetalert';

const MakeAdmin = () => {
    const { loggedInUser: {email} } = useContext(UserContext);
    const { register, handleSubmit } = useForm();

    const onSubmit = data => {
        if (email === "test@admin.com") {
            return swal("Permission restriction!", "As a test-admin, you don't have this permission.", "info");            ;
        }
        axios.post('https://gerez-server.herokuapp.com/addAdmin', data)
            .then(res => res.data && alert("Successfully Added"))
            .catch(error => console.log(error));
    }

    return (
        <div>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <div className="p-5 mx-md-5 mt-5 bg-white" style={{ borderRadius: "15px", maxWidth: '85rem' }}>
                    <Form.Label style={{ fontWeight: "bold" }}>Email</Form.Label>
                    <Form.Row>
                        <Form.Group as={Col} xs="auto" style={{ width: '25rem' }} >
                            <Form.Control
                                className="shadow-none"
                                type="text"
                                {...register("email", { required: true })}
                                placeholder="Email Address" />
                        </Form.Group>
                        <Form.Group as={Col} xs="auto">
                            <Button type="submit" className="shadow-none">
                                Submit
                        </Button>
                        </Form.Group>
                    </Form.Row>
                </div>
            </Form>
        </div>
    );
};

export default MakeAdmin;