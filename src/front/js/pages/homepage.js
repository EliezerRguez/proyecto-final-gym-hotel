import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/home.scss";

export const Homepage = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<h1>HOME</h1>
			<Link to="/profile">Profile</Link>
			<Link to="/info">Info</Link>
			<Link to="/plans">Plans</Link>
			<Link to="/awards">Awards</Link>
		</div>
	);
};
