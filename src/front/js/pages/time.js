import React, { useContext } from "react";
import { Context } from "../store/appContext";
import ProgressBar from "react-bootstrap/ProgressBar";
import Badge from "react-bootstrap/Badge";
import "../../styles/home.scss";

export const Time = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<h1>TIME</h1>
			<Badge className="mb-2" bg="success">
				tiempo total
			</Badge>
			<ProgressBar className="mx-4" animated now={45} />
			<Badge className="my-3" bg="warning" text="dark">
				tiempo del día
			</Badge>
			<ProgressBar className="mx-4" animated now={20} />
			<div className="mb-2">
				<h3>Las siguientes insignias que puedes ganar son:</h3>
			</div>
		</div>
	);
};
