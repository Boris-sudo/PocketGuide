import UserResponseModel from "../user/user-response.model";

export interface ReelDtoModel {
    id?: number;
    image: string;
    title: string;
    description: string;
    user: UserResponseModel;
}