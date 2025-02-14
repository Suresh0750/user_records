import { NextFunction, Request,Response } from "express"
import { HttpStatus } from "@/shared/HttpStatusCode"
import SignupUseCase from "@/application/use_cases/user/SignupUseCase" 
import LoginUsecase from "@/application/use_cases/user/LoginUseCase" 
import { SignupDTO, LoginDTO } from "@/application/dtos/userDTO" 

export default class UserController{
    constructor(private signupUseCase:SignupUseCase,private loginUseCase:LoginUsecase){}

    async signup(req:Request,res:Response,next:NextFunction):Promise<void>{
        try{

            const {userName,emailID,password,role} = req.body
            const signupDTO = new SignupDTO(userName,emailID,password,role)
            const result = await this.signupUseCase.execute(signupDTO)

            res.status(HttpStatus.Success).json({success:true,userID:result.userID})
        }catch(error:unknown){
            next(error)
        }
    }
    async login(req:Request,res:Response,next:NextFunction):Promise<void>{
        try {
            const loginDTO = new LoginDTO(req.body?.userID,req.body?.password)
            const result = await this.loginUseCase.execute(loginDTO)
            res.status(HttpStatus.Success).json({success:true,user:result})
        } catch (error:unknown) {
            next(error)
        }
    }
}