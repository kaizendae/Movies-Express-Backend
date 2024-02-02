import React, {useEffect, useState} from "react";
import MovieDataService from "../services/movies";
import {Link} from "react-router-dom";
import {Button, Col, Row} from "react-bootstrap";
import moment from "moment"

const Movie = props => {
    const [movie, setMovie] = useState({id: null, title: "", description: "", genre: "", rating: "", reviews: []});
    const getMovie = async (id) => {
        MovieDataService.get(id).then(response => {
            setMovie(response.data);
            console.log(response.data);
        }).catch(e => {
            console.log(e);
        });
    }


    useEffect(() => {
        getMovie(props.match.params.id);
    }, [props.match.params.id]);

    function deleteReview(_id, index) {
        MovieDataService.deleteReview(_id, props.user.id)
            .then(response => {
                setMovie((prevState) => {
                    prevState.reviews.splice(index, 1)
                    return {
                        ...prevState
                    }
                })
            })
            .catch(e => {
                console.log(e);
            });
    }

    return (
        <div className="container columns-2">
            <img src={movie.poster + "/100px250"} alt={movie.title} className="object-cover h-180 w-full"/>
            <div className="my-8">
                <div className="card my-8">
                    <h1 className="text-3xl font-bold ">{movie.title}</h1>
                    <p className="text-gray-500 my-2">{movie.rated}</p>
                    <p className="text-gray-500 my-2">{movie.plot}</p>
                    {props.user &&
                        <Link to={"/movies/" + props.match.params.id + "/review"}>
                            Add Review
                        </Link>}
                </div>

                <div className="card my-8">
                    {movie.reviews.map((review) => (
                        <div key={review._id} className="p-4 card">
                            <h5 className="">{review.name + " reviewed on "} {moment(review.date).format("Do MMMM YYYY")}</h5>
                            <p>{review.review}</p>
                            {props.user && props.user.id === review.user_id &&
                                <Row>
                                    <Col><Link to={{
                                        pathname: "/movies/" + props.match.params.id + "/review",
                                        state: {currentReview: review}
                                    }}>Edit</Link>
                                    </Col>
                                    <Col><Button
                                        onClick={() => deleteReview(review._id, movie.reviews.indexOf(review))}
                                        variant="link">Delete</Button></Col>
                                </Row>
                            }
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Movie;
