import { DbWorkerService } from "./db-worker.service";
import WalkModel from "../models/walk/walk.model";
import { WalkDtoModel } from "../models/walk/walkDto.model";

export class WalksService {
    constructor(
        private readonly db: DbWorkerService
    ) {}
    
    async validateWalk(walk: WalkDtoModel): Promise<boolean> {
        if (walk.name!.length < 8) return false;
        
        if (walk.future_friends!.length === 0 && walk.history_friends!.length === 0) return false;
        
        return true;
    }
    
    async createWalk(walk: WalkDtoModel): Promise<WalkModel | string> {
        if (!(await this.validateWalk(walk))) return 'failed';
        return await this.db.createWalk(walk);
    }
    
    async getWalksByUserId(userId: number): Promise<WalkModel[] | string> {
        return await this.db.getFutureWalksByUserId(userId);
    }
    
    async getWalkById(walkId: number): Promise<WalkModel | string> {
        const walk =  await this.db.getWalkById(walkId);
        if (walk === null) return 'failed';
        return walk;
    }
}