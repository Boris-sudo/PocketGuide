import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import UserResponseModel from "../user/user-response.model";
import WalkModel from "../walk/walk.model";
import ReelModel from "./reel.model";

@Entity()
export default class CollectionModel {
    @PrimaryGeneratedColumn()
    id!: number;
    
    @Column()
    name!: string;
    
    @ManyToOne(() => UserResponseModel, user => user.collections, { nullable: true })
    user!: UserResponseModel[];
    
    @ManyToMany(() => ReelModel, reel => reel.collections, { nullable: true })
    reels!: ReelModel[];
}