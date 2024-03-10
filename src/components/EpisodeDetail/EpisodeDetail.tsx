import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Link } from "react-router-dom";
import { GetEpisodeResponseModel } from "../../models/Responses/Episode/GetEpisodeResponseModel";
import { AppDispatch } from "../../store/configureStore";
import { getCharacter, getEpisode } from "../../store/homepage/homepageSlice";
import "./EpisodeDetail.css";
import { GetCharacterResponseModel } from "../../models/Responses/Character/GetCharacterResponseModel";

type Props = {};

interface Character {
	url: string;
	name: string;
}

const EpisodeDetail = (props: Props) => {
	const dispatch = useDispatch<AppDispatch>();
	const episode: GetEpisodeResponseModel = useSelector(
		(state: any) => state.homepage.episode
	);
	const locationUrl = useLocation();
	const idListString = locationUrl.pathname.split("/").slice(2).join(",");
	const ids: number[] = idListString.split(",").map(Number);
	const [characterId, setCharacterId] = useState<number | null>(null);
	const [characters, setCharacters] = useState<Character[]>([]);

	const fetchCharacters = async (characterUrls: string[]) => {
		const characterPromises = characterUrls.map(async (url) => {
			const response = await fetch(url);
			const data = await response.json();
			return data;
		});
		const characterData = await Promise.all(characterPromises);
		setCharacters(characterData);
	};

	useEffect(() => {
		if (episode.characters) {
			fetchCharacters(episode.characters);
		}
	}, [episode.characters]);

	const handleCharacterClick = (characterUrl: string) => {
		const potentialId = characterUrl?.split("/")?.pop();
		if (potentialId) {
			setCharacterId(parseInt(potentialId));
		}
	};

	useEffect(() => {
		if (ids && ids.length > 0) {
			dispatch(getEpisode(ids));
		}
	}, []);

	return (
		<div className="episode-detail">
			<div className="episode-info">
				<h2>{episode.name}</h2>
				<p>
					<b>Air Date:</b> {episode.air_date}
				</p>
				<p>
					<b>Episode code:</b> {episode.episode}
				</p>
				<ul className="characters">
					<h3>Characters</h3>
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

export default EpisodeDetail;
