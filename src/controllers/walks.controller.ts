import { Controller } from "@tsoa/runtime";
import { UserService } from "../services";
import { Body, Delete, Get, OperationId, Path, Post, Response, Route, Security, SuccessResponse, Tags } from "tsoa";
import UserRegisterModel from "../models/user/user-register.model";
import UserResponseModel from "../models/user/user-response.model";
import { DbWorkerService } from "../services/db-worker.service";
import UserLoginModel from "../models/user/user-login.model";
import WalkModel from "../models/walk/walk.model";
import { WalksService } from "../services/walks.service";
import { WalkDtoModel } from "../models/walk/walkDto.model";

@Route('walks')
export class WalksController extends Controller {
    private dbService = new DbWorkerService()
    private walkService = new WalksService(this.dbService);
    
    @Post('create')
    @Response<WalkModel>(200, 'Received')
    @Response<string>(400, "Invalid data")
    @Tags("BackendApi")
    @OperationId('createWalk')
    public async registerUser(
        @Body() walk: WalkDtoModel
    ): Promise<WalkModel | string> {
        console.log('walk create request');
        const result = await this.walkService.createWalk(walk);
        if (typeof result === "string") {
            this.setStatus(400);
            return 'Invalid data';
        }
        this.setStatus(200);
        return result;
    }
    
    @Get('future/{userId}')
    @Response<WalkModel[]>(200, 'Received')
    @Response<string>(400, "Invalid data")
    @Tags('BackendApi')
    @OperationId('getFutureWalksByUserId')
    // @Security('jwt')
    public async getFutureWalksByUserId(
        @Path() userId: string
    ): Promise<WalkModel[] | string> {
        let result = await this.dbService.getFutureWalksByUserId(Number(userId));
        if (result === undefined) result = [];
        if (typeof result === "string") {
            this.setStatus(400);
            return 'Invalid user id';
        }
        this.setStatus(200);
        return result;
    }
    
    @Get('history/{userId}')
    @Response<WalkModel[]>(200, 'Received')
    @Response<string>(400, "Invalid data")
    @Tags('BackendApi')
    @OperationId('getHistoryWalksByUserId')
    // @Security('jwt')
    public async getHistoryWalksByUserId(
        @Path() userId: string
    ): Promise<WalkModel[] | string> {
        let result = await this.dbService.getHistoryWalksByUserId(Number(userId));
        if (result === undefined) result = [];
        if (typeof result === "string") {
            this.setStatus(400);
            return 'Invalid user id';
        }
        this.setStatus(200);
        return result;
    }
    
    @Get('walk/{walkId}')
    @Response<WalkModel>(200, 'Received')
    @Response<string>(400, "Invalid data")
    @Tags('BackendApi')
    @OperationId('getWalksById')
    // @Security('jwt')
    public async getWalkById(
        @Path() walkId: string
    ): Promise<WalkModel | string> {
        const result = await this.walkService.getWalkById(Number(walkId));
        if (typeof result === "string") {
            this.setStatus(400);
            return 'Invalid user id';
        }
        this.setStatus(200);
        return result;
    }
}