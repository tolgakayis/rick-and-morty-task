import { useState } from "react";
import Characters from "../../components/Characters/Characters";
import { Col, Nav, Row } from "react-bootstrap";

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
				{activeTab === "episodes" && <></>}
				{activeTab === "locations" && <Characters />}
				{activeTab === "favorites" && <Characters />}
			</div>
		</div>
	);
};

export default Homepage;
