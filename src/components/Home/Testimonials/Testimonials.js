import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { CardDeck } from 'react-bootstrap';
import SwiperCore, { Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import 'swiper/components/pagination/pagination.scss';
import Testimonial from '../Testimonial/Testimonial';
import './Testimonials.css';

const Testimonials = () => {
    SwiperCore.use([Pagination, Autoplay]);
    const [Reviews, setReviews] = useState([]);

    useEffect(() => {
        axios.get('https://gerez-server.herokuapp.com/reviews')
            .then(res => {
                setReviews(res.data);
            })
            .catch(error => {
                console.log(error);
            })
    }, [])

    return (
        <section id="reviews" className="testimonials p-md-5">
            <div className="my-5 py-5">
                <h2>CLIENT TESTIMONIALS</h2>
                <CardDeck className="mt-5">
                    <Swiper
                        loop={true}
                        pagination={{ clickable: true }}
                        slidesPerView={1}
                        breakpoints={{
                            640: {
                                slidesPerView: 1,
                                spaceBetween: 2,
                            },
                            768: {
                                slidesPerView: 2,
                                spaceBetween: 10,
                            },
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 10,
                            },
                        }}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                          }}
                        spaceBetween={10}
                        onReachEnd={() => console.log('slide end')}
                        onSlideChange={() => console.log('slide change')}
                        onSwiper={(swiper) => console.log(swiper)}
                    >
                        {
                            Reviews.map(testimonial => {
                                return (
                                    <SwiperSlide key={testimonial._id}>
                                        <Testimonial testimonial={testimonial} />
                                    </SwiperSlide>
                                )
                            })
                        }
                    </Swiper>
                </CardDeck>
            </div>
        </section>
    );
};

export default Testimonials;