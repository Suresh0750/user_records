
import { User } from "../models/Users";
export interface IUser extends Omit<User,'createAt' | 'updateAt'> {};