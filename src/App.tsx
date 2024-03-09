import "./App.css";
import { OverlayLoader } from "./components/OverlayLoader/OverlayLoader";
import RouteDefinitions from "./components/Routes/RouteDefinitions";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
	return (
		<>
			<OverlayLoader />
			<RouteDefinitions />
		</>
	);
}

export default App;
