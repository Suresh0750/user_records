
import { IUser } from "@/domain/entities/IUser";
import { IUserRepository } from "@/domain/interface/repositories/IUserRepository";
import User,{UserDocuments} from "../models/user";
import { Model } from "mongoose";


export default class UserRepository implements IUserRepository{
    private UserModel : Model<UserDocuments>
    constructor(){
        this.UserModel = User;
    }
    async create(entity: IUser): Promise<IUser> {
        const result = await this.UserModel.create(entity)
        return result.toObject()
    }
    async findByUserID(entities: { userID: string; password: string; }): Promise<IUser | null> {
        const result = await this.UserModel.findOne({userID:entities.userID}).lean()
        return result
    }  
    async findByEamil(emailID: string): Promise<IUser | undefined> {
        try{
            const result = await this.UserModel.findOne({emailID}).lean()
            return result?.toObject()
        }catch(err){
            // throw Error
        }
    } 
}


