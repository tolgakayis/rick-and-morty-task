import { Route, Routes } from "react-router-dom";
import Homepage from "../../pages/Homepage/Homepage";
import NotFound from "../../pages/NotFound/NotFound";
import CustomNavbar from "../CustomNavbar/CustomNavbar";
import CharacterDetail from "../CharacterDetail/CharacterDetail";
import "./RouteDefinition.css";

type Props = {};

const RouteDefinitions = (props: Props) => {
	return (
		<Routes>
			<Route path="/" element={<Homepage />} />
			<Route path="/characters/:id" element={<CharacterDetail />} />
			{/* <Route path="/about" element={<About />} /> */}
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};

export default RouteDefinitions;
