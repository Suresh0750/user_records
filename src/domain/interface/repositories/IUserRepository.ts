
import { BaseRepository } from "./BaseRepository";
import {IUser} from '@/domain/entities/IUser'
export interface IUserRepository extends Pick<BaseRepository<IUser>,'create'>{
    findByUserID (entities:{userID:string}) : Promise<IUser | null>
}