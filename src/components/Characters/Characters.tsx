import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/configureStore";
import { Paginate } from "../../models/Paginate";
import { Row, Col, Card, Button } from "react-bootstrap";
import { GetCharacterResponseModel } from "../../models/Responses/Character/GetCharacterResponseModel";
import {
	addFavorite,
	getCharacters,
	removeFavorite,
} from "../../store/homepage/homepageSlice";
import PaginationComp from "../Pagination/PaginationComp";
import { Link } from "react-router-dom";
import "./Characters.css";

type Props = {};

const Characters = (props: Props) => {
	const dispatch = useDispatch<AppDispatch>();
	const [pageIndex, setPageIndex] = useState(1);
	const characters: Paginate<GetCharacterResponseModel> = useSelector(
		(state: any) => state.homepage.characters
	);
	const favorites: GetCharacterResponseModel[] = useSelector(
		(state: any) => state.homepage.favorites
	);

	useEffect(() => {
		dispatch(getCharacters(pageIndex));
	}, [pageIndex]);

	const handleFavorite = (
		character: GetCharacterResponseModel,
		characterName: string
	) => {
		const isFavorite = favorites.some((fav) => fav.id === character.id); // Check if character is already a favorite
		if (isFavorite) {
			if (
				window.confirm(
					`Are you sure you want to remove ${characterName} from favorites?`
				)
			) {
				dispatch(removeFavorite(character.id)); // Remove if already favorite
			}
		} else {
			if (favorites.length < 10) {
				dispatch(addFavorite(character)); // Add if not favorite and limit not reached
			} else {
				alert(
					"Favorite character limit reached!(10) Remove a character first."
				);
			}
		}
	};

	const handlePageChange = (pageNumber: number) => {
		setPageIndex(pageNumber);
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
									<Button
										className="btn btn-primary mb-2"
										onClick={() => handleFavorite(character, character.name)}
									>
										{favorites.find((fav) => fav.id === character.id)
											? "Remove Favorite"
											: "Add Favorite"}
									</Button>
									<br />
									<Link to={`/characters/${character.id}`}>View Details</Link>
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
