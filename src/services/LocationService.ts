import { BaseService } from "../core/services/baseService";
import { Paginate } from "../models/Paginate";
import { GetLocationResponseModel } from "../models/Responses/Location/GetLocationResponseModel";

class LocationService extends BaseService<
	Paginate<GetLocationResponseModel>,
	GetLocationResponseModel,
	null,
	null,
	null,
	null,
	null
> {
	constructor() {
		super();
		this.apiUrl = "location";
	}
}

export default new LocationService();
