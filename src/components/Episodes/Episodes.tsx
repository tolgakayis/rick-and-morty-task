import { useEffect, useState } from "react";
import { GetEpisodeResponseModel } from "../../models/Responses/Episode/GetEpisodeResponseModel";
import { getEpisodes } from "../../store/homepage/homepageSlice";
import { Row, Col, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Paginate } from "../../models/Paginate";
import { AppDispatch } from "../../store/configureStore";
import PaginationComp from "../Pagination/PaginationComp";
import { format } from "date-fns";
import { Link } from "react-router-dom";

type Props = {};

const Episodes = (props: Props) => {
	const dispatch = useDispatch<AppDispatch>();
	const [pageIndex, setPageIndex] = useState(1);
	const episodes: Paginate<GetEpisodeResponseModel> = useSelector(
		(state: any) => state.homepage.episodes
	);

	useEffect(() => {
		dispatch(getEpisodes(pageIndex));
	}, [pageIndex]);

	const handlePageChange = (pageNumber: number) => {
		setPageIndex(pageNumber);
		// Implement your logic to fetch data for the new page number (e.g., dispatch an action)
		console.log("Page changed to:", pageNumber);
	};
	return (
		<div>
			<h1 className="mt-3 text-center">Episodes</h1>
			{episodes.results ? (
				<Row xs={1} sm={2} md={4} lg={5} className="g-3 p-4">
					{episodes.results.map((episode) => (
						<Col key={episode.id} className="d-flex justify-content-center">
							<Card
								className="mb-3 text-center"
								style={{ minWidth: 100, maxWidth: 300 }}
							>
								<Card.Body>
									<Card.Title>{episode.name}</Card.Title>
									<Card.Text>
										{format(new Date(episode.air_date), "MMMM d, yyyy")}
									</Card.Text>
									<Link to={`/episodes/${episode.id}`}>View Details</Link>
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
					totalPage={episodes.info?.pages}
				/>
			</div>
		</div>
	);
};

export default Episodes;
