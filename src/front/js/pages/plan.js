import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/home.scss";

export const PersonalPlan = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<h1>PERSONAL PLAN</h1>
			<Link to="/exercise">EXERCISE</Link>
        </div>
	);
};
