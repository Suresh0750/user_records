
import {connect} from 'mongoose'
import {MONGOSH_URL} from '../../config/env'


const connectDB = async()=>{
    try {
        connect(MONGOSH_URL())
    } catch (error:unknown) {
        if(error instanceof Error){
            throw new Error(error.message);
        }
        throw new Error("Unknown error occurred during DB connection")
    }
}

export {connectDB}

