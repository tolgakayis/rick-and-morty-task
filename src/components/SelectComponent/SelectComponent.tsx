import axios from "axios";
import React, { useState } from "react";
import { MultiValue } from "react-select";
import makeAnimated from "react-select/animated";
import AsyncSelect from "react-select/async";
import "./SelectComponent.css";

type Option = {
	value: number;
	label: string;
	episodes: number;
	image: string;
};

const SelectComponent: React.FC = () => {
	const [selectedCharacters, setSelectedCharacters] = useState<Option[]>([]);
	const [loading, setLoading] = useState(false);

	const fetchCharacters = async (inputValue: string) => {
		setLoading(true);
		try {
			const response = await axios.get(
				`https://rickandmortyapi.com/api/character/?name=${inputValue}`
			);
			setLoading(false);
			return response.data.results.map((char: any) => ({
				value: char.id,
				label: char.name,
				episodes: char.episode.length,
				image: char.image,
			}));
		} catch (error) {
			setLoading(false);
			return [];
		}
	};

	const handleSelectChange = (newValue: MultiValue<Option>) => {
		setSelectedCharacters(newValue as Option[]);
	};

	const animatedComponents = makeAnimated();

	const formatOptionLabel = (
		character: Option,
		{ context, inputValue }: { context: string; inputValue: string }
	) => {
		const isSelected = context === "value";
		const searchTerm = inputValue.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
		const regex = new RegExp(searchTerm, "gi");
		const labelWithHighlight = character.label.replace(
			regex,
			(match) => `<strong>${match}</strong>`
		);
		return (
			<div className="character-option-container">
				{!isSelected && (
					<img
						className="character-option-image"
						src={character.image}
						alt={character.label}
					/>
				)}
				<div className="character-option-info">
					<span
						style={{ fontWeight: 500 }}
						dangerouslySetInnerHTML={{ __html: labelWithHighlight }}
					></span>
					{!isSelected && (
						<span style={{ fontWeight: 500, fontSize: 16 }}>
							{character.episodes} Episodes
						</span>
					)}
				</div>
			</div>
		);
	};

	return (
		<div>
			<AsyncSelect
				className="select-component"
				classNamePrefix="select"
				closeMenuOnSelect={false}
				isLoading={loading}
				loadingMessage={() => {
					return "Searching..";
				}}
				loadOptions={fetchCharacters}
				noOptionsMessage={({ inputValue }) => {
					return `No characters found matching "${inputValue}"`;
				}}
				cacheOptions
				isMulti={true}
				value={selectedCharacters}
				onChange={handleSelectChange}
				components={animatedComponents}
				formatOptionLabel={formatOptionLabel}
				placeholder="Search..."
			/>
		</div>
	);
};

export default SelectComponent;
