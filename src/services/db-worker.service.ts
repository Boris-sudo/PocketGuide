import UserResponseModel from "../models/user/user-response.model";
import { getRepository } from "typeorm";
import UserRegisterModel from "../models/user/user-register.model";
import WalkModel from "../models/walk/walk.model";
import ReelModel from "../models/reels/reel.model";
import { WalkDtoModel } from "../models/walk/walkDto.model";
import { ReelDtoModel } from "../models/reels/reelDto.model";

export class DbWorkerService {
    constructor() {}
    
    getCurrentDate(): string {
        const date = new Date();
        const day = String(date.getDate()).padStart(2, '0'); // Get day and pad with zero if needed
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Get month (0-indexed) and pad
        const year = date.getFullYear(); // Get full year
        
        return `${ day }.${ month }.${ year }`; // Format as dd.mm.yyyy
    }
    
    getCurrentTime(): string {
        const date = new Date();
        const hours = String(date.getHours()).padStart(2, '0'); // Get hours and pad with zero if needed
        const minutes = String(date.getMinutes()).padStart(2, '0'); // Get minutes and pad
        
        return `${ hours }:${ minutes }`; // Format as hh:mm
    }
    
    async saveUser(user: UserResponseModel): Promise<UserResponseModel> {
        const repository = getRepository(UserResponseModel);
        return await repository.save(user);
    }
    
    async getUserByParams(params: object): Promise<UserResponseModel | null> {
        const repository = getRepository(UserResponseModel);
        const user =  await repository.findOne({ where: params });
        console.log(user);
        return user;
    }
    
    async createNewUser(user: UserRegisterModel): Promise<UserResponseModel> {
        const userRepository = getRepository(UserResponseModel);
        const newUser = userRepository.create({
            username: user.username,
            email: user.email,
            password: user.password,
            phone: '8 995 924 76 15',
            location: 'Moscow',
            friends: [],
            future_walks: [],
            history_walks: [],
            likes: [],
            collections: [],
        });
        return await this.saveUser(newUser);
    }
    
    async saveWalk(walk: WalkModel): Promise<WalkModel> {
        const repository = getRepository(WalkModel);
        return await repository.save(walk);
    }
    
    async createWalk(walk: WalkDtoModel): Promise<WalkModel> {
        const walkRepository = getRepository(WalkModel);
        let newWalk = walkRepository.create({
            date: this.getCurrentDate(),
            time: this.getCurrentTime(),
            name: walk.name,
            description: walk.description,
            future_friends: walk.future_friends,
            reels: [],
        });
        
        for (let reel of walk.reels!) {
            const newReel = await this.createReel(reel);
            newWalk.reels!.push(newReel);
        }
        
        newWalk = await this.saveWalk(newWalk);
        
        return newWalk;
    }
    
    async saveReel(reel: ReelModel): Promise<ReelModel> {
        const repository = getRepository(ReelModel);
        return await repository.save(reel);
    }
    
    async createReel(reel: ReelDtoModel): Promise<ReelModel> {
        const repository = getRepository(ReelModel);
        const newReel = repository.create({
            image: reel.image,
            title: reel.title,
            description: reel.description,
            user: reel.user,
            collections: [],
        });
        return await this.saveReel(newReel);
    }
    
    async getFutureWalksByUserId(userId: number): Promise<WalkModel[]> {
        const walkModelRepository = getRepository(WalkModel);
        const walks = await walkModelRepository
            .createQueryBuilder('walkModel')
            .innerJoin('walkModel.future-friends', 'user')
            .where('user.id = :userId', { userId })
            .getMany();
        console.log(walks);
        return walks;
    }
    
    async getHistoryWalksByUserId(userId: number): Promise<WalkModel[]> {
        const repository = getRepository(UserResponseModel);
        const user = await repository.findOne({ where: { id: userId } });
        if (user === null) return [];
        return user.history_walks!;
    }
    
    async getWalkById(walkId: number): Promise<WalkModel | null> {
        const walkRepository = getRepository(WalkModel);
        return await walkRepository.findOne({ where: { id: walkId } });
    }
}