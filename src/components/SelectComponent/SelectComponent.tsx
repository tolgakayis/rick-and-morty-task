import axios from "axios";
import React, { useState } from "react";
import { MultiValue } from "react-select";
import makeAnimated from "react-select/animated";
import AsyncSelect from "react-select/async";

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

	const customStyles = {
		control: (base: any) => ({
			...base,
			minWidth: 500,
		}),
	};

	const animatedComponents = makeAnimated();

	const formatOptionLabel = (
		character: Option,
		{ inputValue }: { inputValue: string }
	) => {
		const searchTerm = inputValue.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
		const regex = new RegExp(searchTerm, "gi");
		const labelWithHighlight = character.label.replace(
			regex,
			(match) => `<strong>${match}</strong>`
		);
		return (
			<div>
				<img
					src={character.image}
					alt={character.label}
					style={{ width: 50, marginRight: 10 }}
				/>
				<span
					style={{ fontWeight: 600 }}
					dangerouslySetInnerHTML={{ __html: labelWithHighlight }}
				></span>
				<span style={{ marginLeft: 10, fontWeight: 500, fontSize: 16 }}>
					{character.episodes} Episodes
				</span>
			</div>
		);
	};

	return (
		<div>
			<AsyncSelect
				hideSelectedOptions={false}
				isLoading={loading}
				loadingMessage={() => {
					return "Searching..";
				}}
				loadOptions={fetchCharacters}
				noOptionsMessage={({ inputValue }) => {
					return `No characters found matching "${inputValue}"`;
				}}
				cacheOptions
				styles={customStyles}
				isMulti
				closeMenuOnSelect={false}
				value={selectedCharacters}
				onChange={handleSelectChange}
				components={animatedComponents}
				formatOptionLabel={formatOptionLabel}
			/>
		</div>
	);
};

export default SelectComponent;
