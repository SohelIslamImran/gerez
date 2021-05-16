import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import toast from 'react-hot-toast';
import swal from 'sweetalert';
import { UserContext } from '../../../App';
import AddService from '../AddService/AddService';
import TableLoader from '../TableLoader/TableLoader';

const ManageService = () => {
    const { loggedInUser: { email } } = useContext(UserContext);
    const [services, setServices] = useState([]);
    const [editService, setEditService] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('https://gerez-server.herokuapp.com/services')
            .then(res => {
                setServices(res.data);
                setLoading(false);
            })
            .catch(error => toast.error(error.message))
    }, [editService])

    const restrictPermission = id => {
        let matchedID = false;
        for (let i = 0; i < 6; i++) {
            const { _id } = services[i];
            if (id === _id) {
                matchedID = true;
            }
        }
        if (email === "test@admin.com" && matchedID) {
            return true;
        }
        return false;
    }

    const handleDeleteService = id => {
        if (restrictPermission(id)) {
            return swal("Permission restriction!", "As a test-admin, you don't have permission to delete 6 core services. But you can delete your added services.", "info");
        }

        swal({
            title: "Are you sure?",
            text: "Are you sure you want to delete this service?",
            icon: "warning",
            buttons: [true, "Yes"],
            dangerMode: true,
        }).then(wantDelete => {
            if (wantDelete) {
                const loading = toast.loading('Deleting...Please wait!');
                const removedServices = services.filter(item => item._id !== id);
                axios.delete(`https://gerez-server.herokuapp.com/delete/${id}`)
                    .then(res => {
                        toast.dismiss(loading);
                        if (res.data) {
                            setServices(removedServices)
                            return swal("Successfully Deleted!", "Your service has been successfully deleted.", "success");
                        }
                        swal("Failed!", "Something went wrong! Please try again.", "error", { dangerMode: true });
                    })
                    .catch(err => {
                        toast.dismiss(loading);
                        swal("Failed!", "Something went wrong! Please try again.", "error", { dangerMode: true })
                    })
            }
        });
    }

    return (
        editService._id ? <AddService editService={editService} setEditService={setEditService} restrictPermission={restrictPermission} /> :
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
                                                className="p-1 mb-0"
                                                onClick={() => setEditService(service)}
                                            >
                                                <FontAwesomeIcon icon={faEdit} className="mx-1" />Edit
                                            </Button>
                                            <Button
                                                variant="outline-danger"
                                                className="p-1 ml-3 mb-0"
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