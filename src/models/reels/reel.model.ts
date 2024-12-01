import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import UserResponseModel from "../user/user-response.model";
import WalkModel from "../walk/walk.model";
import CollectionModel from "./collection.model";

@Entity()
export default class ReelModel {
    @PrimaryGeneratedColumn()
    id!: number;
    
    @Column()
    image: string = '';
    
    @Column({ nullable: true })
    title!: string;
    
    @Column({ nullable: true })
    description!: string;
    
    @ManyToOne(() => UserResponseModel, user => user.likes, { nullable: true })
    user!: UserResponseModel;
    
    @ManyToOne(() => WalkModel, walk => walk.reels, { nullable: true })
    walk!: WalkModel;
    
    @ManyToMany(() => CollectionModel, collection => collection.reels, { nullable: true })
    collections!: CollectionModel[];
}