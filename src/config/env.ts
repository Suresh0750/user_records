import dotenv from 'dotenv'

dotenv.config()


export const MONGOSH_URL = ()=>{
   if(!process.env.MONGO_URL) throw Error("Mongosh url is not there")
    return String(process.env.MONGO_URL)
}


export const PORT = process.env.PORT || 3002