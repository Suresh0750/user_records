import { SignupDTO } from "@/application/dtos/userDTO";
import { IUser } from "@/domain/entities/IUser";
import { IUserRepository } from "@/domain/interface/repositories/IUserRepository";
import { IBcrypt } from "@/domain/interface/services/IBcrypt";
import bcrypt from 'bcrypt';

export class SignupUseCase {
    constructor(private userRepository: IUserRepository,private bcrptService:IBcrypt) {}

    private async generateUniqueUserID(): Promise<string> {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let userID: string;
        let isUnique = false;

        while (!isUnique) {
            userID = '';
            for (let i = 0; i < 5; i++) {
                userID += characters.charAt(Math.floor(Math.random() * characters.length));
            }
            
            const existingUser = await this.userRepository.findByUserID({userID});
            if (!existingUser) {
                isUnique = true;
            }
        }
        return userID;
    }

    // * sign up usecase
    async execute(signupDTO: SignupDTO): Promise<IUser> {

        const userID: string = await this.generateUniqueUserID();
        const hashPassword = await this.bcrptService.hashPassword(signupDTO.password)

        const user : IUser = {
            userID,
            userName: signupDTO.userName,
            emailID : signupDTO.emailID,
            password : hashPassword,
            role : signupDTO.role
        }

    
        return await this.userRepository.create(user);;
    }
    
}
