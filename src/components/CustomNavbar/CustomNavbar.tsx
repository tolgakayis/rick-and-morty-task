import "./CustomNavbar.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Select, { MultiValue } from "react-select";
import { useState, useEffect } from "react";
import { GetCharacterResponseModel } from "../../models/Responses/Character/GetCharacterResponseModel";
import makeAnimated from "react-select/animated";
import SelectComponent from "../SelectComponent/SelectComponent";

type Props = {};

const CustomNavbar = (props: Props) => {
	return (
		<Navbar expand="lg" className="">
			<Container fluid>
				<Navbar.Brand href="/">Rick and Morty Task</Navbar.Brand>
				<Navbar.Toggle aria-controls="navbarScroll" />
				<Navbar.Collapse id="navbarScroll">
					<Nav
						className="me-auto my-2 my-lg-0"
						style={{ maxHeight: "100px" }}
						navbarScroll
					>
						<Nav.Link href="/">Homepage</Nav.Link>
					</Nav>
					<SelectComponent />
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default CustomNavbar;
