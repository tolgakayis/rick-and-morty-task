import React, { useEffect, useState } from "react";
import { GetLocationResponseModel } from "../../models/Responses/Location/GetLocationResponseModel";
import { getLocations } from "../../store/homepage/homepageSlice";
import { useDispatch, useSelector } from "react-redux";
import { Paginate } from "../../models/Paginate";
import { AppDispatch } from "../../store/configureStore";
import { Card, Col, Row } from "react-bootstrap";
import PaginationComp from "../Pagination/PaginationComp";
import { Link } from "react-router-dom";

type Props = {};

const Locations = (props: Props) => {
	const dispatch = useDispatch<AppDispatch>();
	const [pageIndex, setPageIndex] = useState(1);
	const locations: Paginate<GetLocationResponseModel> = useSelector(
		(state: any) => state.homepage.locations
	);

	useEffect(() => {
		dispatch(getLocations(pageIndex));
	}, [pageIndex]);

	const handlePageChange = (pageNumber: number) => {
		setPageIndex(pageNumber);
		// Implement your logic to fetch data for the new page number (e.g., dispatch an action)
		console.log("Page changed to:", pageNumber);
	};
	return (
		<div>
			<h1 className="mt-3 text-center">Locations</h1>
			{locations.results ? (
				<Row xs={1} sm={2} md={4} lg={5} className="g-3 p-4">
					{locations.results.map((location) => (
						<Col key={location.id} className="d-flex justify-content-center">
							<Card
								className="mb-3 text-center"
								style={{ minWidth: 100, maxWidth: 300 }}
							>
								<Card.Body>
									<Card.Title>{location.name}</Card.Title>
									<Card.Text>{location.type}</Card.Text>
									<Card.Text>{location.dimension}</Card.Text>
									<Link to={`/locations/${location.id}`}>View Details</Link>
								</Card.Body>
							</Card>
						</Col>
					))}
				</Row>
			) : (
				<></>
			)}
			<div className="d-flex justify-content-center">
				<PaginationComp
					currentPage={pageIndex}
					onPageChange={handlePageChange}
					totalPage={locations.info?.pages}
				/>
			</div>
		</div>
	);
};

export default Locations;
