import "./App.css";
import CustomNavbar from "./components/CustomNavbar/CustomNavbar";
import { OverlayLoader } from "./components/OverlayLoader/OverlayLoader";
import RouteDefinitions from "./components/Routes/RouteDefinitions";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
	return (
		<div className="App">
			<OverlayLoader />
			<CustomNavbar />
			<RouteDefinitions />
		</div>
	);
}

export default App;
