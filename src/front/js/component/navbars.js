import React from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";

export const Navbars = () => {
	return (
		<Navbar collapseOnSelect expand="sm" bg="dark" variant="dark" className="lx-4">
			<Navbar.Brand href="#home">APPTIVATE</Navbar.Brand>
			<Navbar.Toggle aria-controls="responsive-navbar-nav" />
			<Navbar.Collapse id="responsive-navbar-nav">
				<Nav className="mx-3">
					<Nav.Link href="/profile">My profile</Nav.Link>
					<Nav.Link href="/personal-plan">My plan</Nav.Link>
					<Nav.Link href="/booking">Booking</Nav.Link>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
};
