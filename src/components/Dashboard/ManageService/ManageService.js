import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';

const ManageService = () => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/services')
            .then(res => {
                setServices(res.data);
            })
            .catch(error => {
                console.log(error);
            })
    }, [])

    const handleDeleteService = id => {
        const removedServices = services.filter(item => item._id !== id);

        axios.delete(`http://localhost:5000/delete/${id}`)
            .then(res => res.data && setServices(removedServices))
            .catch(error => console.log(error))
    }

    return (
        <div className="px-5 pt-4 mx-md-4 mt-5 bg-white" style={{ borderRadius: "15px" }}>
            <Table hover borderless responsive>
                <thead className="bg-light">
                    <tr>
                        <th>Service</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                {services.map(service => {
                    return (
                        <tbody key={service._id} style={{ fontWeight: "500" }}>
                            <tr>
                                <td>{service.title}</td>
                                <td>{service.description.slice(0, 100)}...</td>
                                <td>${service.price}</td>
                                <td>
                                    <Button
                                        variant="outline-success"
                                        className="p-1 mb-0 shadow-none"
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="outline-danger"
                                        className="p-1 ml-2 mb-0 shadow-none"
                                        onClick={() => handleDeleteService(service._id)}
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        </tbody>
                    )
                })}
            </Table>
        </div>
    );
};

export default ManageService;