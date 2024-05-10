import { useEffect, useState } from "react";
import Select, { MultiValue } from "react-select";
import { GetCharacterResponseModel } from "../../models/Responses/Character/GetCharacterResponseModel";
import makeAnimated from "react-select/animated";

type Option = {
	value: number;
	label: string;
	episodes: number;
	image: string;
};

const SelectComponent: React.FC = () => {
	const [characters, setCharacters] = useState<GetCharacterResponseModel[]>([]);
	const [selectedCharacters, setSelectedCharacters] = useState<Option[]>([]);

	useEffect(() => {
		const fetchCharacters = async () => {
			let allCharacters:
				| any[]
				| ((
						prevState: GetCharacterResponseModel[]
				  ) => GetCharacterResponseModel[]) = [];
			let page = 1;

			// Loop to fetch characters from all pages
			while (true) {
				const url = `https://rickandmortyapi.com/api/character?page=${page}`;
				const response = await fetch(url);
				const data = await response.json();

				allCharacters = allCharacters.concat(data.results); // Add characters to array

				if (!data.info.next) {
					break; // Stop if there are no more pages
				}

				page++;
			}

			setCharacters(allCharacters);
		};

		fetchCharacters();
	}, []);

	const handleSelectChange = (newValue: MultiValue<Option>) => {
		setSelectedCharacters([...newValue]);
	};

	const characterOptions: Option[] = characters.map((character) => ({
		value: character.id,
		label: character.name,
		episodes: character.episode.length,
		image: character.image,
	}));

	const customStyles = {
		control: (provided: any) => ({
			...provided,
			minWidth: "500px",
		}),
	};

	const animatedComponents = makeAnimated();

	return (
		<div>
			<Select
				styles={customStyles}
				isMulti
				closeMenuOnSelect={false}
				value={selectedCharacters}
				onChange={handleSelectChange}
				options={characterOptions}
				components={animatedComponents}
				formatOptionLabel={(characters) => (
					<div className="characters">
						<img
							src={characters.image}
							style={{
								height: "50px",
								width: "50px",
								borderRadius: "20%",
								marginRight: "10px",
							}}
						/>
						<span style={{ fontSize: 16, fontWeight: 700 }}>
							{characters.label}
						</span>
						<span
							className="span"
							style={{
								fontSize: 16,
								fontWeight: 500,
								marginLeft: 10,
								marginTop: 20,
							}}
						>
							{characters.episodes} Episodes
						</span>
					</div>
				)}
			/>
		</div>
	);
};

export default SelectComponent;
