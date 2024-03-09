import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/configureStore";
import { Paginate } from "../../models/Paginate";
import { Row, Col, Card } from "react-bootstrap";
import { GetCharacterResponseModel } from "../../models/Responses/Character/GetCharacterResponseModel";
import { getCharacters } from "../../store/homepage/homepageSlice";
import PaginationComp from "../Pagination/PaginationComp";

type Props = {};

const Characters = (props: Props) => {
	const dispatch = useDispatch<AppDispatch>();
	const [pageIndex, setPageIndex] = useState(1);
	const characters: Paginate<GetCharacterResponseModel> = useSelector(
		(state: any) => state.homepage.characters
	);

	useEffect(() => {
		dispatch(getCharacters(pageIndex));
	}, [pageIndex]);

	const handlePageChange = (pageNumber: number) => {
		setPageIndex(pageNumber);
		// Implement your logic to fetch data for the new page number (e.g., dispatch an action)
		console.log("Page changed to:", pageNumber);
	};
	return (
		<div>
			<h1 className="mt-3 text-center">Characters</h1>
			{characters.results ? (
				<Row xs={1} sm={2} md={4} lg={5} className="g-3 p-4">
					{characters.results.map((character) => (
						<Col key={character.id} className="d-flex justify-content-center">
							<Card
								className="mb-3 text-center"
								style={{ minWidth: 100, maxWidth: 300 }}
							>
								<Card.Img variant="top" src={character.image} />
								<Card.Body>
									<Card.Title>{character.name}</Card.Title>
									<Card.Text>{character.species}</Card.Text>
									<Card.Link href="#">View Details</Card.Link>
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
					totalPage={characters.info?.pages}
				/>
			</div>
		</div>
	);
};

export default Characters;
