import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
import { GetCharacterResponseModel } from "../../models/Responses/Character/GetCharacterResponseModel";
import { AppDispatch } from "../../store/configureStore";
import { getCharacter } from "../../store/homepage/homepageSlice";
import { useEffect } from "react";
import "./CharacterDetail.css";
import { Image } from "react-bootstrap";

type Props = {};

const CharacterDetail = (props: Props) => {
	const dispatch = useDispatch<AppDispatch>();
	const character: GetCharacterResponseModel = useSelector(
		(state: any) => state.homepage.character
	);
	const location = useLocation();
	const idListString = location.pathname.split("/").slice(2).join(","); // Assuming IDs after "/characters/"
	const ids: number[] = idListString.split(",").map(Number);

	useEffect(() => {
		if (ids && ids.length > 0) {
			dispatch(getCharacter(ids));
		}
	}, []);

	return (
		<div className="character-detail">
			<img
				src={character.image}
				alt={character.name}
				className="character-image"
			/>
			<div className="character-info">
				<h2>{character.name}</h2>
				<p>
					<b>Gender:</b> {character.gender}
				</p>
				<p>
					<b>Species:</b> {character.species}
				</p>
				<p>
					<b>Status:</b> {character.status}
				</p>
				{character.type && ( // Conditionally render type if present
					<p>
						<b>Type:</b> {character.type}
					</p>
				)}
				<p>
					<b>Location:</b>{" "}
					{character.location?.url ? (
						<Link to={character.location?.url}>{character.location?.name}</Link>
					) : (
						<span>Unknown</span>
					)}
				</p>
				<ul className="episodes">
					<h3>Episodes</h3>
					{character.episode?.map((episode) => (
						<li key={episode}>
							<Link to={episode}>{episode}</Link>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default CharacterDetail;
