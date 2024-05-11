import axios from "axios";
import React, { useState, useEffect } from "react";
import Select, { MultiValue } from "react-select";
import makeAnimated from "react-select/animated";
import AsyncSelect from "react-select/async";

type Option = {
	value: number;
	label: string;
	episodes: number;
	image: string;
};

const SelectComponent: React.FC = () => {
	const [characters, setCharacters] = useState<Option[]>([]);
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
		const regex = new RegExp(inputValue, "gi");
		const labelWithHighlight = character.label.replace(
			regex,
			`<strong>${inputValue}</strong>`
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
				isLoading={loading}
				loadingMessage={() => {
					return "Searching..";
				}}
				loadOptions={fetchCharacters}
				noOptionsMessage={({ inputValue }) => {
					return `No characters found matching "${inputValue}"`;
				}}
				cacheOptions
				defaultOptions
				styles={customStyles}
				isMulti
				closeMenuOnSelect={false}
				value={selectedCharacters}
				onChange={handleSelectChange}
				options={characters}
				components={animatedComponents}
				formatOptionLabel={formatOptionLabel}
				getOptionLabel={(option: Option) => option.label}
				getOptionValue={(option: Option) => option.value.toString()}
			/>
		</div>
	);
};

export default SelectComponent;
