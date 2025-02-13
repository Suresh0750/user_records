

export class SignupDTO{
    readonly userName: string;
    readonly emailID: string;
    readonly password: string;
    readonly role: "user" | "admin" ;
    constructor(userName:string ,emailID:string,password:string,role:'user' | 'admin'){
        this.emailID = emailID,
        this.userName = userName,
        this.password = password,
        this.role = role
    }   
}