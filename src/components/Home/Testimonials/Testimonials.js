import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { CardDeck } from 'react-bootstrap';
import Testimonial from '../Testimonial/Testimonial';
import './Testimonials.css';

const Testimonials = () => {
    const [Reviews, setReviews] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/reviews')
            .then(res => {
                setReviews(res.data);
            })
            .catch(error => {
                console.log(error);
            })
    }, [])

    return (
        <section className="testimonials p-md-5">
            <div className="my-5 py-5">
                <h2>CLIENT TESTIMONIALS</h2>
                <CardDeck className="mt-5">
                    {
                        Reviews.map(testimonial => <Testimonial key={testimonial._id} testimonial={testimonial} />)
                    }
                </CardDeck>
            </div>
        </section>
    );
};

export default Testimonials;