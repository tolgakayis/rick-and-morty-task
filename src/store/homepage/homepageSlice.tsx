import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Paginate } from "../../models/Paginate";
import { GetCharacterResponseModel } from "../../models/Responses/Character/GetCharacterResponseModel";
import { GetEpisodeResponseModel } from "../../models/Responses/Episode/GetEpisodeResponseModel";
import { GetLocationResponseModel } from "../../models/Responses/Location/GetLocationResponseModel";
import CharacterService from "../../services/CharacterService";
import LocationService from "../../services/LocationService";
import EpisodeService from "../../services/EpisodeService";

export interface HomepageModel {
	characters: Paginate<GetCharacterResponseModel>;
	locations: Paginate<GetLocationResponseModel>;
	episodes: Paginate<GetEpisodeResponseModel>;
	favorites: Paginate<GetCharacterResponseModel>;
	character: GetCharacterResponseModel[];
	location: GetLocationResponseModel[];
	episode: GetEpisodeResponseModel[];
}

const initialState: HomepageModel = {
	characters: {} as Paginate<GetCharacterResponseModel>,
	locations: {} as Paginate<GetLocationResponseModel>,
	episodes: {} as Paginate<GetEpisodeResponseModel>,
	favorites: {} as Paginate<GetCharacterResponseModel>,
	character: {} as GetCharacterResponseModel[],
	location: {} as GetLocationResponseModel[],
	episode: {} as GetEpisodeResponseModel[],
};

export const getCharacters = createAsyncThunk(
	"homepage/getCharacters",
	async function GetCharacters(pageIndex: number) {
		const characters = (await CharacterService.getAll(pageIndex)).data;
		return characters;
	}
);

export const getCharacter = createAsyncThunk(
	"homepage/getCharacter",
	async function GetCharacter(id: number[]) {
		const character = (await CharacterService.getById(id)).data;
		return character;
	}
);

export const getLocations = createAsyncThunk(
	"homepage/getLocations",
	async function GetLocations(pageIndex: number) {
		const locations = (await LocationService.getAll(pageIndex)).data;
		return locations;
	}
);

export const getLocation = createAsyncThunk(
	"homepage/getLocation",
	async function GetLocation(id: number[]) {
		const location = (await LocationService.getById(id)).data;
		return location;
	}
);

export const getEpisodes = createAsyncThunk(
	"homepage/getEpisodes",
	async function GetEpisodes(pageIndex: number) {
		const episodes = (await EpisodeService.getAll(pageIndex)).data;
		return episodes;
	}
);

export const getEpisode = createAsyncThunk(
	"homepage/getEpisode",
	async function GetEpisode(id: number[]) {
		const episode = (await EpisodeService.getById(id)).data;
		return episode;
	}
);

const homepageSlice = createSlice({
	name: "homepage",
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder.addCase(getCharacters.fulfilled, (state, action) => {
			state.characters = action.payload;
			localStorage.setItem("characters", JSON.stringify(action.payload));
		});
		builder.addCase(getEpisodes.fulfilled, (state, action) => {
			state.episodes = action.payload;
			localStorage.setItem("episodes", JSON.stringify(action.payload));
		});
		builder.addCase(getLocations.fulfilled, (state, action) => {
			state.locations = action.payload;
			localStorage.setItem("locations", JSON.stringify(action.payload));
		});
		builder.addCase(getCharacter.fulfilled, (state, action) => {
			state.character = action.payload;
			localStorage.setItem("character", JSON.stringify(action.payload));
		});
		builder.addCase(getLocation.fulfilled, (state, action) => {
			state.location = action.payload;
			localStorage.setItem("location", JSON.stringify(action.payload));
		});
		builder.addCase(getEpisode.fulfilled, (state, action) => {
			state.episode = action.payload;
			localStorage.setItem("episode", JSON.stringify(action.payload));
		});
	},
});

export const homepageReducer = homepageSlice.reducer;
export const homepageActions = homepageSlice.actions;
