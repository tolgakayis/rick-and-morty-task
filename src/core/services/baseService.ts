import { AxiosResponse } from "axios";
import axiosInstance from "../interceptors/axiosInterceptor";

export class BaseService<
	GetAllType,
	GetByIdType,
	AddRequestType,
	AddResponseType,
	UpdateRequestType,
	UpdateResponseType,
	DeleteResponseType
> {
	public apiUrl: string;

	constructor() {
		this.apiUrl = "";
	}

	getAllByPage(pageIndex: number): Promise<AxiosResponse<GetAllType, any>> {
		return axiosInstance.get<GetAllType>(this.apiUrl + "/?page=" + pageIndex);
	}

	getById(ids: number[]): Promise<AxiosResponse<GetByIdType[], any>> {
		const idsString = ids.join(",");
		return axiosInstance.get<GetByIdType[]>(this.apiUrl + "/" + idsString);
	}

	add(request: AddRequestType): Promise<AxiosResponse<AddResponseType, any>> {
		return axiosInstance.post<AddResponseType>(this.apiUrl, request);
	}

	update(
		request: UpdateRequestType
	): Promise<AxiosResponse<UpdateResponseType, any>> {
		return axiosInstance.put<UpdateResponseType>(this.apiUrl, request);
	}

	delete(id: number): Promise<AxiosResponse<DeleteResponseType, any>> {
		return axiosInstance.delete<DeleteResponseType>(this.apiUrl + "/" + id);
	}
}
