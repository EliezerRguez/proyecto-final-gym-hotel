import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export const Exercise = () => {
	const [singleExercise, setSingleExercise] = useState([]);
	const params = useParams();

	console.log(params);

	async function getSingleExercise() {
		const response = await fetch(process.env.BACKEND_URL + `/api/exercises/${params.id}`);
		console.log(response);
		const responseJson = await response.json();
		setSingleExercise(responseJson);
		console.log(responseJson);
	}

	useEffect(() => {
		getSingleExercise();
	}, []);

	return (
		<div className="text-center mt-5">
			<Container>
				<Row>
					<Col xs={6} className="mb-4">
						<h1>{`EXERCISE ${singleExercise.id}`}</h1>
					</Col>
					<Col xs={6} className="mb-4">
						<i className="fas fa-star"></i>
						<i className="fas fa-star"></i>
						<i className="fas fa-star"></i>
						<i className="fas fa-star"></i>
						<i className="fas fa-star"></i>
					</Col>
				</Row>
				<Row>
					<Col xs={12} className="mb-4">
						<iframe
							width="100%"
							height="100%"
							src="https://www.youtube.com/embed/i27K2ry9jEo"
							title="YouTube video player"></iframe>
					</Col>
				</Row>
				<Row>
					<Col xs={4} className="mb-4">
						<span>{singleExercise.time}</span>
					</Col>
					<Col xs={4} className="mb-4">
						<span>{singleExercise.details}</span>
					</Col>
					<Col xs={4} className="mb-4">
						<span>10 reps each</span>
					</Col>
				</Row>
				<Row>
					<Col xs={6} className="px-2">
						<div className="text-center">TIMER</div>
					</Col>
					<Col xs={2} className="px-2">
						<Button className="p-2" variant="primary">
							Start
						</Button>
					</Col>
					<Col xs={2} className="px-2">
						<Button className="p-2" variant="danger">
							Stop
						</Button>
					</Col>
					<Col xs={2} className="px-2">
						<Button className="p-2" variant="success">
							Save
						</Button>
					</Col>
				</Row>
				<Row>
					<Col xs={6} className="text-center my-4">
						<Button variant="outline-primary">
							<Link to="/personal-plan">List of exercises</Link>
						</Button>
					</Col>
					<Col xs={6} className="text-center my-4">
						<Button variant="primary">Next exercise</Button>
					</Col>
				</Row>
			</Container>
		</div>
	);
};
