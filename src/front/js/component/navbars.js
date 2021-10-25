//import { Link } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";
import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/index.scss";

export const Navbars = () => {
	const { store, actions } = useContext(Context);

	function logout() {
		localStorage.removeItem("jwt-token", store.client_token);
	}

	return (
		<Navbar collapseOnSelect expand="sm" bg="dark" variant="dark" className="lx-4 p-3">
			<Navbar.Brand>
				<Link to="/homepage" className="text-light">
					APPTIVATE
				</Link>
			</Navbar.Brand>
			<Navbar.Toggle aria-controls="responsive-navbar-nav" />
			<Navbar.Collapse id="responsive-navbar-nav">
				<Nav className="mx-3">
					<Nav.Link href="/profile">My profile</Nav.Link>
					<Nav.Link href="/homepage">Home</Nav.Link>
					<Nav.Link href="/booking">Booking</Nav.Link>
					<Nav.Link href="/login" onClick={logout}>
						Logout
					</Nav.Link>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
};
