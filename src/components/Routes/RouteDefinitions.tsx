import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "../../pages/Homepage/Homepage";
import NotFound from "../../pages/NotFound/NotFound";
import CustomNavbar from "../CustomNavbar/CustomNavbar";

type Props = {};

const RouteDefinitions = (props: Props) => {
	return (
		<Routes>
			<Route
				path="/"
				element={
					<>
						<CustomNavbar /> <Homepage />
					</>
				}
			/>
			{/* <Route path="/about" element={<About />} /> */}
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};

export default RouteDefinitions;