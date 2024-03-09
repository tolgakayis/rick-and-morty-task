import {
	PayloadAction,
	createAction,
	createAsyncThunk,
	createSlice,
} from "@reduxjs/toolkit";
import { Paginate } from "../../models/Paginate";
import { GetCharacterResponseModel } from "../../models/Responses/Character/GetCharacterResponseModel";
import { GetEpisodeResponseModel } from "../../models/Responses/Episode/GetEpisodeResponseModel";
import { GetLocationResponseModel } from "../../models/Responses/Location/GetLocationResponseModel";
import CharacterService from "../../services/CharacterService";

export interface HomepageModel {
	characters: Paginate<GetCharacterResponseModel>;
	locations: Paginate<GetLocationResponseModel>;
	episodes: Paginate<GetEpisodeResponseModel>;
	favorites: Paginate<GetCharacterResponseModel>;
}

const initialState: HomepageModel = {
	characters: {} as Paginate<GetCharacterResponseModel>,
	locations: {} as Paginate<GetLocationResponseModel>,
	episodes: {} as Paginate<GetEpisodeResponseModel>,
	favorites: {} as Paginate<GetCharacterResponseModel>,
};

export const getCharacters = createAsyncThunk(
	"homepage/getCharacters",
	async function GetCharacters(pageIndex: number) {
		const characters = (await CharacterService.getAll(pageIndex)).data;
		return characters;
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
	},
});

export const homepageReducer = homepageSlice.reducer;
export const homepageActions = homepageSlice.actions;
