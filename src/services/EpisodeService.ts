import { BaseService } from "../core/services/baseService";
import { Paginate } from "../models/Paginate";
import { GetEpisodeResponseModel } from "../models/Responses/Episode/GetEpisodeResponseModel";

class EpisodeService extends BaseService<
	Paginate<GetEpisodeResponseModel>,
	GetEpisodeResponseModel,
	null,
	null,
	null,
	null,
	null
> {
	constructor() {
		super();
		this.apiUrl = "episode";
	}
}

export default new EpisodeService();
