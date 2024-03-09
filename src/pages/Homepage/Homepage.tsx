import { useState } from "react";
import Characters from "../../components/Characters/Characters";
import { Col, Nav, Row } from "react-bootstrap";
import Episodes from "../../components/Episodes/Episodes";
import Locations from "../../components/Locations/Locations";
import Favorites from "../../components/Favorites/Favorites";
import "./Homepage.css";

type Props = {};

const Homepage = (props: Props) => {
	const [activeTab, setActiveTab] = useState<string>("characters");
	const handleTabClick = (selectedKey: string | null) => {
		if (selectedKey) {
			setActiveTab(selectedKey);
		}
	};
	return (
		<div>
			<Row className="tbt-tabs">
				<Row>
					<Col xs={12}>
						<Nav
							variant="tabs"
							activeKey={activeTab}
							onSelect={handleTabClick}
							className="custom-tab-list"
						>
							<Nav.Item>
								<Nav.Link eventKey="characters" className="">
									Characters
								</Nav.Link>
							</Nav.Item>
							<Nav.Item>
								<Nav.Link eventKey="episodes" className="">
									Episodes
								</Nav.Link>
							</Nav.Item>
							<Nav.Item>
								<Nav.Link eventKey="locations" className="">
									Locations
								</Nav.Link>
							</Nav.Item>
							<Nav.Item>
								<Nav.Link eventKey="favorites" className="">
									Favorites
								</Nav.Link>
							</Nav.Item>
						</Nav>
					</Col>
				</Row>
			</Row>
			<div className="custom-tab-content">
				{activeTab === "characters" && <Characters />}
				{activeTab === "episodes" && <Episodes />}
				{activeTab === "locations" && <Locations />}
				{activeTab === "favorites" && <Favorites />}
			</div>
		</div>
	);
};

export default Homepage;
