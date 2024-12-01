import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import UserResponseModel from "../user/user-response.model";
import ReelModel from "../reels/reel.model";

@Entity()
export default class WalkModel {
    @PrimaryGeneratedColumn()
    id!: number;
    
    @Column()
    date?: string = '';
    
    @Column()
    time?: string = '';
    
    @Column()
    name?: string = '';
    
    @Column()
    description?: string = '';
    
    @ManyToMany(() => UserResponseModel, user => user.history_walks, { nullable: true })
    @JoinTable()
    history_friends?: UserResponseModel[];
    
    @ManyToMany(() => UserResponseModel, user => user.future_walks, { nullable: true })
    @JoinTable()
    future_friends?: UserResponseModel[];
    
    @OneToMany(() => ReelModel, reel => reel.walk, { nullable: true })
    @JoinTable()
    reels?: ReelModel[];
}