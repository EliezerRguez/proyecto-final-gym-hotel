import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.scss";

export const Login = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<Link to="/personal-data">
                Login
            </Link>
		</div>
	);
};
