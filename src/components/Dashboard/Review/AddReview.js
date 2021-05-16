import axios from 'axios';
import React, { useContext } from 'react';
import { Button, Col, Form } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import swal from 'sweetalert';
import { UserContext } from '../../../App';

const AddReview = ({ review, setReview, edit, setEdit }) => {
    const { loggedInUser: { photo, name, email } } = useContext(UserContext);
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = data => {
        const loading = toast.loading('Uploading...Please wait!');
        data.img = photo || "https://i.ibb.co/5GzXkwq/user.png";
        data.email = email;

        if (edit) {
            axios.patch(`https://gerez-server.herokuapp.com/updateReview/${review._id}`, data)
                .then(res => {
                    toast.dismiss(loading);
                    if (
                        data.name === review.name &&
                        data.address === review.address &&
                        data.description === review.description
                    ) {
                        setEdit(false);
                        return toast.error("You haven't changed anything!");
                    }
                    if (res.data) {
                        setEdit(false);
                        return swal("Successfully updated", "Your review has been successfully updated!", "success");
                    }
                    swal("Failed!", "Something went wrong! Please try again.", "error", { dangerMode: true });
                })
                .catch(error => {
                    toast.dismiss(loading);
                    swal("Failed!", "Something went wrong! Please try again.", "error", { dangerMode: true });
                });
            return;
        }

        axios.post('https://gerez-server.herokuapp.com/addReview', data)
            .then(res => {
                toast.dismiss(loading);
                if (res.data) {
                    reset();
                    setReview(data);
                    return swal("Successfully Submitted", "Your review has been successfully submitted.", "success");
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
            <Form onSubmit={handleSubmit(onSubmit)} className="w-100 form-main">
                <div className="p-5 mx-auto mt-5 bg-white" style={{ borderRadius: "15px", maxWidth: '50rem' }}>
                    <Form.Row className="justify-content-center px-4">
                        <Form.Group as={Col} md={12}>
                            <Form.Label style={{ fontWeight: "bold" }}>Your Name</Form.Label>
                            <Form.Control
                                type="text"
                                defaultValue={review?.name || name}
                                {...register("name", { required: true })}
                                placeholder="Your Name" />
                        </Form.Group>
                        <Form.Group as={Col} md={12}>
                            <Form.Label style={{ fontWeight: "bold" }}>Address</Form.Label>
                            <Form.Control
                                type="text"
                                defaultValue={review?.address || ""}
                                {...register("address", { required: true })}
                                placeholder="Address" />
                        </Form.Group>
                        <Form.Group as={Col} md={12}>
                            <Form.Label style={{ fontWeight: "bold" }}>Description</Form.Label>
                            <Form.Control
                                style={{ height: "10rem" }}
                                type="text"
                                defaultValue={review?.description || ""}
                                as="textarea"
                                {...register("description", { required: true })}
                                placeholder="Description" />
                        </Form.Group>
                    </Form.Row>
                    <div className="text-center mt-4">
                        <Button type="submit" className="btn-main" style={{ padding: ".6rem 2rem" }}>
                            {review ? "Update" : "Submit"}
                        </Button>
                    </div>
                </div>
            </Form>
        </section>
    );
};

export default AddReview;