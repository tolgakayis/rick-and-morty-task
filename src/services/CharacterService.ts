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
	//getAll(pageIndex: number): Promise<AxiosResponse<GetAllType, any>> {
	//	return axiosInstance.get<GetAllType>(this.apiUrl + "/?page=" + pageIndex);
	//}
}

export default new CharacterService();
