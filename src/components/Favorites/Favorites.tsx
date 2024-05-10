import React, { useEffect, useState } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Paginate } from "../../models/Paginate";
import { GetCharacterResponseModel } from "../../models/Responses/Character/GetCharacterResponseModel";
import { AppDispatch } from "../../store/configureStore";
import { removeFavorite } from "../../store/homepage/homepageSlice";

type Props = {};

const Favorites = (props: Props) => {
	const dispatch = useDispatch<AppDispatch>();
	const favorites: GetCharacterResponseModel[] = useSelector(
		(state: any) => state.homepage.favorites
	);
	const handleRemoveFavorite = (characterId: number, characterName: string) => {
		if (
			window.confirm(
				`Are you sure you want to remove ${characterName} from favorites?`
			)
		) {
			dispatch(removeFavorite(characterId));
		}
	};

	return (
		<div>
			<h1 className="mt-3 text-center">Favorite Characters</h1>
			{favorites.length > 0 ? (
				<Row
					xs={1}
					sm={2}
					md={4}
					lg={5}
					className="g-3 p-4"
					style={{ marginLeft: 0, marginRight: 0 }}
				>
					{favorites.map((character) => (
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
										onClick={() =>
											handleRemoveFavorite(character.id, character.name)
										}
									>
										Remove Favorite
									</Button>
									<Button variant="link" href={`/characters/${character.id}`}>
										View Details
									</Button>
								</Card.Body>
							</Card>
						</Col>
					))}
				</Row>
			) : (
				<h3 className="d-flex justify-content-center mt-3">
					You don't have a favorite character yet!
				</h3>
			)}
		</div>
	);
};

export default Favorites;
