import axios from "axios";
import { useEffect, useState } from "react";
import { CardGroup, Spinner } from "react-bootstrap";
import toast from "react-hot-toast";
import Fade from "react-reveal/Fade";
import SwiperCore, { Autoplay, Pagination } from "swiper";
import "swiper/components/pagination/pagination.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";
import Testimonial from "./Testimonial";

SwiperCore.use([Pagination, Autoplay]);

const Testimonials = () => {
    const [loading, setLoading] = useState(true);
    const [Reviews, setReviews] = useState([]);

    useEffect(() => {
        axios
            .get("https://gerez-server.herokuapp.com/reviews")
            .then((res) => {
                setReviews(res.data);
                setLoading(false);
            })
            .catch((error) => toast.error(error.message));
    }, []);

    return (
        <section id="reviews" className="testimonials p-md-3">
            <Fade bottom duration={2500} distance="40px">
                <div className="my-5 py-4">
                    <div className="review-title text-center">
                        <span>What Our Clients Says</span>
                        <h2>Testimonials</h2>
                    </div>
                    {loading ? (
                        <div className="text-center">
                            <Spinner animation="border" variant="danger" />
                        </div>
                    ) : (
                        <CardGroup className="mt-5">
                            <Swiper
                                loop
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
                            >
                                {Reviews.map((testimonial) => {
                                    return (
                                        <SwiperSlide key={testimonial._id}>
                                            <Testimonial testimonial={testimonial} />
                                        </SwiperSlide>
                                    );
                                })}
                            </Swiper>
                        </CardGroup>
                    )}
                </div>
            </Fade>
        </section>
    );
};

export default Testimonials;
