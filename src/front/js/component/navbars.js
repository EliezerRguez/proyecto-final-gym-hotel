//import { Link } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";
import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/index.scss";

export const Navbars = () => {
	const { store, actions } = useContext(Context);
	const [data, setData] = useState([]);

	function logout() {
		localStorage.removeItem("jwt-token", store.client_token);
	}

	const token = localStorage.getItem("jwt-token");

	function navbar() {
		if (token) {
			console.log(data.gender);
			return (
				<Navbar collapseOnSelect expand="sm" bg="light" variant="light" className="lx-4 p-2 text-light">
					<Nav.Link href="/profile">
						<i className="far fa-user text-dark"></i>
					</Nav.Link>
					<Nav.Link href="/homepage">
						<i className="fas fa-home text-dark"></i>
					</Nav.Link>
					<Nav.Link href="/booking">
						<i className="far fa-calendar-alt text-dark"></i>
					</Nav.Link>
					<Nav.Link href="/login" onClick={logout}>
						<i className="fas fa-power-off text-dark"></i>
					</Nav.Link>
				</Navbar>
			);
		} else {
			return (
				<Navbar collapseOnSelect expand="sm" bg="light" variant="light" className="lx-4 p-2 text-light d-none">
					<Nav.Link href="/profile">
						<i className="far fa-user text-dark"></i>
					</Nav.Link>
					<Nav.Link href="/homepage">
						<i className="fas fa-home text-dark"></i>
					</Nav.Link>
					<Nav.Link href="/booking">
						<i className="far fa-calendar-alt text-dark"></i>
					</Nav.Link>
					<Nav.Link href="/login" onClick={logout}>
						<i className="fas fa-power-off text-dark"></i>
					</Nav.Link>
				</Navbar>
			);
		}
	}
	return navbar();
};
