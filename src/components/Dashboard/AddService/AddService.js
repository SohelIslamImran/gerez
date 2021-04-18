import axios from 'axios';
import React, { useState } from 'react';
import { Button, Col, Form } from 'react-bootstrap';
import { useForm } from "react-hook-form";

const AddService = () => {
    const { register, handleSubmit } = useForm();
    const [imageURL, setImageURL] = useState("");

    const onSubmit = data => {
        const serviceInfo = {
            title: data.title,
            description: data.description,
            price: data.price,
            image: imageURL
        }
        console.log(serviceInfo);

        if (!imageURL && data.description && data.title) {
            return alert('Image is uploading... Please wait!')
        }

        axios.post('http://localhost:5000/addService', serviceInfo)
            .then(res => res.data && console.log("Successfully Added"))
            .catch(error => console.log(error));
    }

    const handleImageUpload = event => {
        const imageData = new FormData();
        imageData.set('key', '08d5da1c81cc5c52012f0b930505d031');
        imageData.append('image', event.target.files[0]);

        axios.post('https://api.imgbb.com/1/upload', imageData)
            .then(res => setImageURL(res.data.data.display_url))
            .catch(error => console.log(error));
    }

    return (
        <div>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <div className="p-5 mx-md-5 mt-5 bg-white" style={{ borderRadius: "15px", maxWidth: '85rem' }}>
                    <Form.Row>
                        <Form.Group as={Col} md={5} sm={12} className="mr-md-5">
                            <Form.Label style={{ fontWeight: "bold" }}>Service Title</Form.Label>
                            <Form.Control
                                className="shadow-none"
                                type="text"
                                {...register("title", { required: true })}
                                placeholder="Enter Title" />
                        </Form.Group>
                        <Form.Group as={Col} md={5} sm={12}>
                            <Form.Label style={{ fontWeight: "bold" }}>Price</Form.Label>
                            <Form.Control
                                className="shadow-none"
                                style={{ maxWidth: "260px" }}
                                name="price"
                                type="text"
                                {...register("price", { required: true })}
                                placeholder="Enter Price" />
                        </Form.Group>
                        <Form.Group as={Col} md={5} sm={12} className="mr-md-5">
                            <Form.Label style={{ fontWeight: "bold" }}>Description</Form.Label>
                            <Form.Control className="shadow-none"
                                style={{ height: "8rem" }}
                                type="text"
                                as="textarea"
                                {...register("description", { required: true })}
                                placeholder="Enter Description" />
                        </Form.Group>
                        <Form.Group as={Col} md={5} sm={12}>
                            <Form.Label style={{ fontWeight: "bold" }}>Add Image</Form.Label>
                            <Button
                                as={"label"}
                                htmlFor="upload"
                                variant="outline-primary"
                                className="d-block px-2 upload-btn"
                                style={{ maxWidth: "220px" }}>
                                Upload Image
                            </Button>
                            <Form.Control
                                hidden="hidden"
                                id="upload"
                                name="photo"
                                type="file"
                                {...register("image", { required: true })}
                                onChange={handleImageUpload}
                                placeholder="Upload photo" />
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

export default AddService;