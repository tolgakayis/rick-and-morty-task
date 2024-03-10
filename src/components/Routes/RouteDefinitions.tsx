import { Route, Routes } from "react-router-dom";
import Homepage from "../../pages/Homepage/Homepage";
import NotFound from "../../pages/NotFound/NotFound";
import CharacterDetail from "../CharacterDetail/CharacterDetail";
import "./RouteDefinition.css";
import EpisodeDetail from "../EpisodeDetail/EpisodeDetail";
import LocationDetail from "../LocationDetail/LocationDetail";

type Props = {};

const RouteDefinitions = (props: Props) => {
	return (
		<Routes>
			<Route path="/" element={<Homepage />} />
			<Route path="/characters/:id" element={<CharacterDetail />} />
			<Route path="/episodes/:id" element={<EpisodeDetail />} />
			<Route path="/locations/:id" element={<LocationDetail />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};

export default RouteDefinitions;
