import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';

const OrderList = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axios.get('https://gerez-server.herokuapp.com/orders')
            .then(res => setOrders(res.data))
            .catch(error => console.log(error))
    }, [])

    const handleStatusChange = (id, status) => {
        const modifiedStatus = { id, status }

        axios.patch('https://gerez-server.herokuapp.com/updateOrderStatus', modifiedStatus)
            .then(res => res.data && console.log(res.data, "Successfully Modified"))
            .catch(error => console.log(error));
    }

    return (
        <div className="px-5 pt-4 mx-md-4 mt-5 bg-white" style={{ borderRadius: "15px" }}>
            <Table hover borderless responsive>
                <thead className="bg-light">
                    <tr>
                        <th>Name</th>
                        <th>Email ID</th>
                        <th>Service</th>
                        <th>Pay With</th>
                        <th>Status</th>
                    </tr>
                </thead>
                {
                    orders.map(order => {
                        return (
                            <tbody key={order._id} style={{ fontWeight: "500" }}>
                                <tr>
                                    <td>{order.name}</td>
                                    <td>{order.email}</td>
                                    <td>{order.service}</td>
                                    <td>{order.payWith}</td>
                                    <td>
                                        <select
                                            className={order.status === "Pending" ? "btn btn-danger" : order.status === "Done" ? "btn btn-success" : "btn btn-info"}
                                            defaultValue={order.status}
                                            onChange={e => handleStatusChange(order._id, e.target.value)}>
                                            <option className="bg-white text-muted">Pending</option>
                                            <option className="bg-white text-muted">On going</option>
                                            <option className="bg-white text-muted">Done</option>
                                        </select>
                                    </td>
                                </tr>
                            </tbody>
                        )
                    })
                }
            </Table>
        </div>
    );
};

export default OrderList;