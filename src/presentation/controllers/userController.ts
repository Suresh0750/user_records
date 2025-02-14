import { NextFunction, Request,Response } from "express"
import { HttpStatus } from "@/shared/HttpStatusCode"
import SignupUseCase from "@/application/use_cases/user/SignupUseCase" 
import LoginUsecase from "@/application/use_cases/user/LoginUseCase" 
import { SignupDTO, LoginDTO } from "@/application/dtos/userDTO" 
import { COOKIES } from "@/shared/constants"
import { LoginUsecaseResponse } from "@/domain/entities/IUser"
import { NODE_ENV } from "@/config/env"

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
            const result = await this.loginUseCase.execute(loginDTO) as LoginUsecaseResponse

            // * set the token in cookie
            res.cookie(COOKIES.ACCESS_TOKEN, result.accessToken,{
                httpOnly: false,
                secure : NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 10 * 60 * 1000, 
            })
            res.cookie(COOKIES.REFRESH_TOKEN, result.refreshToken,{
                httpOnly: true,
                secure : NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 60 * 60 * 1000, 
            })
            res.status(HttpStatus.Success).json({success:true,userData:result.userData})
        } catch (error:unknown) {
            next(error)
        }
    }
}