import UserResponseModel from "../user/user-response.model";
import { ReelDtoModel } from "../reels/reelDto.model";

export interface WalkDtoModel {
    name: string;
    description: string;
    history_friends?: UserResponseModel[];
    future_friends?: UserResponseModel[];
    reels: ReelDtoModel[];
}