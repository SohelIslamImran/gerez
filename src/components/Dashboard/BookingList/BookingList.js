import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { UserContext } from '../../../App';
import BookListLoader from '../BookListLoader/BookListLoader';
import './BookingList.css';

const BookingList = () => {
    const { loggedInUser: { email } } = useContext(UserContext);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`https://gerez-server.herokuapp.com/orders?email=${email}`)
            .then(res => {
                setOrders(res.data);
                setLoading(false);
            })
            .catch(error => toast.error(error.message))
    }, [email])

    return (
        <>
            {loading ?
                <div className="px-md-4 pt-md-1 bg-white" style={{ borderRadius: "15px" }}>
                    <BookListLoader />
                </div>
                : <Row className="mx-md-5">
                    {orders.map(order => {
                        return (
                            <Col key={order._id} md={4}>
                                <Card className="border-0 py-4 mb-4 booking-list">
                                    <div className="d-flex justify-content-between px-4">
                                        <img
                                            height="100"
                                            width="100"
                                            src={order.image}
                                            alt=""
                                        />
                                        <h5 className={order.status.toLowerCase()}>{order.status}</h5>
                                    </div>
                                    <Card.Body className="py-0">
                                        <Card.Title as="h4" className="my-4">{order.service}</Card.Title>
                                        <Card.Text className="text-muted">{order.description}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )
                    })}
                </Row>}
        </>
    );
};

export default BookingList;