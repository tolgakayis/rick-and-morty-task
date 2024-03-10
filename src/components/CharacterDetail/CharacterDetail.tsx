import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
import { GetCharacterResponseModel } from "../../models/Responses/Character/GetCharacterResponseModel";
import { AppDispatch } from "../../store/configureStore";
import { getCharacter } from "../../store/homepage/homepageSlice";
import { useEffect, useState } from "react";
import "./CharacterDetail.css";

type Props = {};

interface Episode {
	url: string;
	name: string;
}

const CharacterDetail = (props: Props) => {
	const dispatch = useDispatch<AppDispatch>();
	const character: GetCharacterResponseModel = useSelector(
		(state: any) => state.homepage.character
	);
	const location = useLocation();
	const idListString = location.pathname.split("/").slice(2).join(",");
	const ids: number[] = idListString.split(",").map(Number);

	const [episodeId, setEpisodeId] = useState<number | null>(null);
	const [episodes, setEpisodes] = useState<Episode[]>([]);

	const fetchEpisodes = async (episodeUrls: string[]) => {
		try {
			const episodePromises = episodeUrls.map(async (url) => {
				const response = await fetch(url);
				if (!response.ok) {
					throw new Error(`Failed to fetch episode: ${url}`);
				}
				const data = await response.json();
				return data;
			});
			const episodeData = await Promise.all(episodePromises);
			setEpisodes(episodeData);
		} catch (error) {
			console.error("Error fetching episodes:", error);
		}
	};

	useEffect(() => {
		if (character.episode) {
			fetchEpisodes(character.episode);
		}
	}, [character.episode]);

	const handleEpisodeClick = (episodeUrl: string) => {
		const potentialId = episodeUrl?.split("/")?.pop();
		if (potentialId) {
			setEpisodeId(parseInt(potentialId));
		}
	};

	useEffect(() => {
		if (ids && ids.length > 0) {
			dispatch(getCharacter(ids));
		}
	}, []);

	const locationId = character.location?.url?.split("/").pop();
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
				{character.type && (
					<p>
						<b>Type:</b> {character.type}
					</p>
				)}
				<p>
					<b>Location:</b>
					{character.location?.url ? (
						<Link to={`/locations/${locationId}`}>
							{character.location?.name}
						</Link>
					) : (
						<span>Unknown</span>
					)}
				</p>
				<ul className="episodes">
					<h3>Episodes</h3>
					{episodes.map((episode) => (
						<li key={episode.url}>
							<Link
								to={`/episodes/${episode.url.split("/")?.pop()}`}
								onClick={() => handleEpisodeClick(episode.url)}
							>
								{episode.name}
							</Link>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default CharacterDetail;
