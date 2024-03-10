import { useDispatch, useSelector } from "react-redux";
import { useLocation, Link } from "react-router-dom";
import { GetLocationResponseModel } from "../../models/Responses/Location/GetLocationResponseModel";
import { AppDispatch } from "../../store/configureStore";
import { useEffect, useState } from "react";
import { getLocation } from "../../store/homepage/homepageSlice";
import "./LocationDetail.css";

type Props = {};

interface Character {
	url: string;
	name: string;
}

const LocationDetail = (props: Props) => {
	const dispatch = useDispatch<AppDispatch>();
	const location: GetLocationResponseModel = useSelector(
		(state: any) => state.homepage.location
	);
	const locationUrl = useLocation();
	const idListString = locationUrl.pathname.split("/").slice(2).join(",");
	const ids: number[] = idListString.split(",").map(Number);

	const [characterId, setCharacterId] = useState<number | null>(null);
	const [characters, setCharacters] = useState<Character[]>([]);

	const fetchCharacters = async (characterUrls: string[]) => {
		try {
			const characterPromises = characterUrls.map(async (url) => {
				const response = await fetch(url);
				if (!response.ok) {
					throw new Error(`Failed to fetch character: ${url}`);
				}
				const data = await response.json();
				return data;
			});
			const characterData = await Promise.all(characterPromises);
			setCharacters(characterData);
		} catch (error) {
			console.error("Error fetching characters:", error);
		}
	};

	useEffect(() => {
		if (location.residents) {
			fetchCharacters(location.residents);
		}
	}, [location.residents]);

	const handleCharacterClick = (characterUrl: string) => {
		const potentialId = characterUrl?.split("/")?.pop();
		if (potentialId) {
			setCharacterId(parseInt(potentialId));
		}
	};

	useEffect(() => {
		if (ids && ids.length > 0) {
			dispatch(getLocation(ids));
		}
	}, []);

	return (
		<div className="location-detail">
			<div className="location-info">
				<h2>{location.name}</h2>
				<p>
					<b>Dimension:</b> {location.dimension}
				</p>
				{location.type && (
					<p>
						<b>Type:</b> {location.type}
					</p>
				)}
				<ul className="residents">
					<h3>Residents</h3>
					{characters.map((character) => (
						<li key={character.url}>
							<Link
								to={`/characters/${character.url.split("/")?.pop()}`}
								onClick={() => handleCharacterClick(character.url)}
							>
								{character.name}
							</Link>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default LocationDetail;
