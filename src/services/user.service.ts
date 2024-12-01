import UserRegisterModel from "../models/user/user-register.model";
import UserResponseModel from "../models/user/user-response.model";
import { DbWorkerService } from "./db-worker.service";
import bcrypt from 'bcryptjs';
import UserLoginModel from "../models/user/user-login.model";
import { randomUUID } from "node:crypto";
import { redis } from "../server";

export default class UserService {
    
    constructor(
        private db: DbWorkerService,
    ) {}
    
    private async validateNewUser(user: UserRegisterModel): Promise<boolean> {
        const existingUser = await this.db.getUserByParams({ email: user.email });
        const existingUserByUsername = await this.db.getUserByParams({username: user.username});
        
        if (existingUser) return false;
        
        if (user.password.length < 8) return false;
        
        if (existingUserByUsername) return false;
        
        return true;
    }
    
    private async generateToken(user: UserResponseModel) {
    }
    
    private async hashPassword(password: string) {
        return await bcrypt.hash(password, 10)
    }
    
    async registerNewUser(user: UserRegisterModel): Promise<UserResponseModel | string> {
        let response: UserResponseModel | string = 'Invalid data';
        
        if (await this.validateNewUser(user)) {
            user.password = await this.hashPassword(user.password);
            response = await this.db.createNewUser(user);
        }
        
        return response;
    }
    
    async loginUser(user: UserLoginModel): Promise<UserResponseModel | string> {
        const foundUser= await this.db.getUserByParams({email: user.email});
        if (foundUser && (await bcrypt.compare(user.password, foundUser.password))) {
            const token: string = randomUUID();
            foundUser.token = token;
            return foundUser;
        }
        return "Invalid data";
    }
    
    async getProfile(userId: number): Promise<UserResponseModel | string> {
        const user = await this.db.getUserByParams({ id: userId });
        if (user) return user;
        return 'Invalid user id';
    }
}