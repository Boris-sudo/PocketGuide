import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import WalkModel from "../walk/walk.model";
import ReelModel from "../reels/reel.model";
import CollectionModel from "../reels/collection.model";

@Entity()
export default class UserResponseModel {
    @PrimaryGeneratedColumn()
    id!: number;
    
    @Column()
    token: string = '';
    
    @Column()
    username: string = '';
    
    @Column()
    email: string = '';
    
    @Column()
    phone?: string;
    
    @Column()
    password: string = '';
    
    @Column()
    location?: string;
    
    @ManyToMany(() => UserResponseModel, user => user.friends, { nullable: true })
    friends?: UserResponseModel[];
    
    @ManyToMany(() => WalkModel, walk => walk.history_friends, { nullable: true })
    future_walks?: WalkModel[];
    
    @ManyToMany(() => WalkModel, walk => walk.future_friends, { nullable: true })
    history_walks?: WalkModel[];
    
    @OneToMany(() => CollectionModel, collection => collection.user, { nullable: true })
    @JoinTable()
    collections?: CollectionModel[];
    
    @OneToMany(() => ReelModel, reel => reel.user, { nullable: true })
    @JoinTable()
    likes?: ReelModel[];
}