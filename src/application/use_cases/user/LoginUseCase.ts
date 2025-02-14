
import { IBcrypt } from "@/domain/interface/services/IBcrypt";
import { IUserRepository } from "@/domain/interface/repositories/IUserRepository";


export default class LoginUsecase{
    constructor(private userRepository:IUserRepository,private bcrptService : IBcrypt){}
    // * login usecase
    async execute(data:{userID:string,password:string}):Promise<boolean>{
        const isCheckUser = await this.userRepository.findByUserID({userID:data.userID})
        if(!isCheckUser) throw new Error(`User doesn't exist`)
        return await this.bcrptService.comparePass(data.password,isCheckUser.password)
    }
}