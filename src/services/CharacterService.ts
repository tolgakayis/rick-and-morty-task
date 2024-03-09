import { BaseService } from "../core/services/baseService";
import { Paginate } from "../models/Paginate";
import { GetCharacterResponseModel } from "../models/Responses/Character/GetCharacterResponseModel";

class CharacterService extends BaseService<
	Paginate<GetCharacterResponseModel>,
	GetCharacterResponseModel,
	null,
	null,
	null,
	null,
	null
> {
	constructor() {
		super();
		this.apiUrl = "character";
	}
}

export default new CharacterService();
