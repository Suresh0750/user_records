import { ValidationError } from "@/domain/entities/CustomeError";

// * DTO - (Data Transfer Object)
export class SignupDTO{
    readonly userName: string;
    readonly emailID: string;
    readonly password: string;
    readonly role: "user" | "admin" ;
    constructor(userName:string ,emailID:string,password:string,role:'user' | 'admin'){

        if(!userName || !emailID || !password || !role) throw new ValidationError('Missing required fields')

        this.emailID = emailID,
        this.userName = userName,
        this.password = password,   
        this.role = role
    }   
}

export class LoginDTO{

    readonly userID : string;
    readonly password : string;

    constructor(userID:string,password:string){
        if( !userID || !password) throw new ValidationError('Missing required fields')
        this.userID = userID;
        this.password = password
    }

}