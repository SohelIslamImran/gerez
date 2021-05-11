import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import swal from 'sweetalert';
import { UserContext } from '../../../App';
import TableLoader from '../TableLoader/TableLoader';

const ManageService = () => {
    const { loggedInUser: { email } } = useContext(UserContext);
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('https://gerez-server.herokuapp.com/services')
            .then(res => {
                setServices(res.data);
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
            })
    }, [])

    const handleDeleteService = id => {
        if (email === "test@admin.com") {
            return swal("Permission restriction!", "As a test-admin, you don't have this permission.", "info");
        }
        const removedServices = services.filter(item => item._id !== id);

        axios.delete(`https://gerez-server.herokuapp.com/delete/${id}`)
            .then(res => res.data && setServices(removedServices))
            .catch(error => console.log(error))
    }

    return (
        <div className="px-5 pt-4 mx-md-4 mt-5 bg-white" style={{ borderRadius: "15px" }}>
            {loading ? <TableLoader />
                : <Table hover borderless responsive>
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
                </Table>}
        </div>
    );
};

export default ManageService;