import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React from 'react';
import { Button, Col, Form } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import swal from 'sweetalert';
import './AddService.css';

const AddService = () => {
    const { register, handleSubmit } = useForm();

    const onSubmit = async data => {
        const loading = toast.loading('Uploading...Please wait!');
        const imageData = new FormData();
        imageData.set('key', '08d5da1c81cc5c52012f0b930505d031');
        imageData.append('image', data.image[0]);

        let imageURL = "";
        try {
            const res = await axios.post('https://api.imgbb.com/1/upload', imageData);
            imageURL = res.data.data.display_url;
        } catch (error) {
            toast.dismiss(loading);
            return toast.error('Failed to upload the image!');
        }

        const serviceInfo = {
            title: data.title,
            description: data.description,
            price: data.price,
            image: imageURL
        }

        axios.post('https://gerez-server.herokuapp.com/addService', serviceInfo)
            .then(res => {
                toast.dismiss(loading);
                if (res.data) {
                    return swal("Successfully Uploaded", "Your new service has been successfully added.", "success");
                }
                swal("Failed!", "Something went wrong! Please try again.", "error", { dangerMode: true });
            })
            .catch(error => {
                toast.dismiss(loading);
                swal("Failed!", "Something went wrong! Please try again.", "error", { dangerMode: true });
            });
    }

    return (
        <section className="add-service">
            <Form onSubmit={handleSubmit(onSubmit)} className="w-100">
                <div className="py-5 mx-auto mt-5 bg-white form-main" style={{ borderRadius: "15px", maxWidth: '85rem' }}>
                    <Form.Row className="justify-content-center">
                        <Form.Group as={Col} md={5} sm={12} className="mr-md-5">
                            <Form.Label style={{ fontWeight: "bold" }}>Service Title</Form.Label>
                            <Form.Control
                                type="text"
                                {...register("title", { required: true })}
                                placeholder="Enter Title" />
                        </Form.Group>
                        <Form.Group as={Col} md={5} sm={12}>
                            <Form.Label style={{ fontWeight: "bold" }}>Price</Form.Label>
                            <Form.Control
                                style={{ maxWidth: "260px" }}
                                name="price"
                                type="text"
                                {...register("price", { required: true })}
                                placeholder="Enter Price" />
                        </Form.Group>
                        <Form.Group as={Col} md={5} sm={12} className="mr-md-5 mt-md-3">
                            <Form.Label style={{ fontWeight: "bold" }}>Description</Form.Label>
                            <Form.Control
                                style={{ height: "10rem" }}
                                type="text"
                                as="textarea"
                                {...register("description", { required: true })}
                                placeholder="Enter Description" />
                        </Form.Group>
                        <Form.Group as={Col} md={5} sm={12} className="mt-md-3">
                            <Form.Label style={{ fontWeight: "bold" }}>Add Image</Form.Label>
                            <Button
                                as={"label"}
                                htmlFor="upload"
                                variant="outline-primary"
                                className="d-block p-2 upload-btn">
                                <FontAwesomeIcon icon={faCloudUploadAlt} className="mr-2" />Upload Image
                            </Button>
                            <Form.Control
                                hidden="hidden"
                                id="upload"
                                name="photo"
                                type="file"
                                {...register("image", { required: true })}
                                placeholder="Upload photo" />
                        </Form.Group>
                    </Form.Row>
                    <div className="text-center mt-4">
                        <Button type="submit" className="submit-btn btn-main">
                            Submit
                        </Button>
                    </div>
                </div>
            </Form>
        </section>
    );
};

export default AddService;