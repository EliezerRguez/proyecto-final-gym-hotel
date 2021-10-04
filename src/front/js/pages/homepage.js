import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.scss";

export const Home = () => {
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
