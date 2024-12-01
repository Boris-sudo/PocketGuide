import { Controller } from "@tsoa/runtime";
import { UserService } from "../services";
import { Body, Get, OperationId, Path, Post, Response, Route, Security, SuccessResponse, Tags } from "tsoa";
import UserRegisterModel from "../models/user/user-register.model";
import UserResponseModel from "../models/user/user-response.model";
import ErrorResponseModel from "../models/error-response.model";
import { DbWorkerService } from "../services/db-worker.service";
import UserLoginModel from "../models/user/user-login.model";

@Route('auth')
export class UsersController extends Controller {
    private dbService = new DbWorkerService()
    private userService = new UserService(this.dbService)
    
    @Post('register')
    @Response<string>(400, "Invalid data")
    @Response<UserResponseModel>(200, 'Received')
    @Tags("BackendApi")
    @OperationId('registerUser')
    public async registerUser(
        @Body() user: UserRegisterModel
    ): Promise<UserResponseModel | string> {
        const result = await this.userService.registerNewUser(user);
        if (typeof result === "string") {
            this.setStatus(400);
            return 'Invalid data';
        }
        this.setStatus(200);
        return result;
    }
    
    @Post('login')
    @Response<string>(400, "Invalid data")
    @Response<UserResponseModel>(200, 'Received')
    @Tags("BackendApi")
    @OperationId('loginUser')
    public async loginUser(
        @Body() user: UserLoginModel
    ): Promise<UserResponseModel | string> {
        console.log(user);
        const result = await this.userService.loginUser(user);
        if (typeof result === "string") {
            this.setStatus(400);
            return 'Invalid data';
        }
        this.setStatus(200);
        return result;
    }
    
    @Get('profile/{userId}')
    @Response<string>(400, "Invalid data")
    @Response<UserResponseModel>(200, 'Received')
    @Tags('BackendApi')
    // @Security('jwt')
    public async getProfile(
        @Path() userId: string
    ): Promise<UserResponseModel | string> {
        const result = await this.userService.getProfile(Number(userId));
        console.log(result);
        if (typeof result === "string") {
            this.setStatus(400);
            return 'Invalid user id';
        }
        this.setStatus(200);
        return result;
    }
}