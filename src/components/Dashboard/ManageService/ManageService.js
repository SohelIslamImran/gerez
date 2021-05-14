import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import toast from 'react-hot-toast';
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
            .catch(error => toast.error(error.message))
    }, [])

    const handleDeleteService = id => {
        if (email === "test@admin.com") {
            return swal("Permission restriction!", "As a test-admin, you don't have this permission.", "info");
        }

        swal({
            title: "Are you sure?",
            text: "Are you sure you want to delete this service?",
            icon: "warning",
            buttons: [true, "Yes"],
            dangerMode: true,
        }).then(wantDelete => {
            if (wantDelete) {
                const removedServices = services.filter(item => item._id !== id);
                axios.delete(`https://gerez-server.herokuapp.com/delete/${id}`)
                    .then(res => {
                        if (res.data) {
                            setServices(removedServices)
                            return swal("Successfully Deleted!", "Your service has been successfully deleted.", "success");
                        }
                        swal("Failed!", "Something went wrong! Please try again.", "error", { dangerMode: true });
                    })
                    .catch(err => swal("Failed!", "Something went wrong! Please try again.", "error", { dangerMode: true }))
            } else {
                swal("Don't worry! Your service is safe.");
            }
        });
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
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    {services.map(service => {
                        return (
                            <tbody key={service._id} style={{ fontWeight: "500" }}>
                                <tr>
                                    <td>{service.title}</td>
                                    <td>{service.description.slice(0, 100)}...</td>
                                    <td>${service.price}</td>
                                    <td className="text-center">
                                        <Button
                                            variant="outline-success"
                                            className="p-1 mb-0 shadow-none"
                                        >
                                            <FontAwesomeIcon icon={faEdit} className="mx-1" />Edit
                                        </Button>
                                        <Button
                                            variant="outline-danger"
                                            className="p-1 ml-3 mb-0 shadow-none"
                                            onClick={() => handleDeleteService(service._id)}
                                        >
                                            <FontAwesomeIcon icon={faTrash} className="mx-1" />Delete
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