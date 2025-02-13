import { NextFunction, Request,Response } from "express"
import {SignupUseCase} from "@/application/use_cases/user/SignupUseCase" 
import {LoginUsecase} from "@/application/use_cases/user/LoginUseCase" 
import { HttpStatus } from "@/shared/HttpStatusCode"

export default class UserController{
    constructor(private signupUseCase:SignupUseCase,private loginUseCase:LoginUsecase){}

    async signup(req:Request,res:Response,next:NextFunction){
        try{
            const result = await this.signupUseCase.execute(req.body)
            return res.status(HttpStatus.Success).json({success:true,user:result})
        }catch(err:unknown){
            next(err)
        }
    }
}