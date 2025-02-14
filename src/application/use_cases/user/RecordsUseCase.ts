
import { IRecords } from '@/domain/entities/IRecords';
import IRecordsRepository from '@/domain/interface/repositories/IRecordsRepository'

export default class UserRecords{

    constructor(private userRecords:IRecordsRepository){}
    
    async getFetchRecord(userId:string):Promise<IRecords[] | null>{
        return await this.userRecords.findByUserId(userId)
    }
    async updateRecord(entity:IRecords) {
        await this.userRecords.update(entity)
    }
    async deleteRecord(_id:string){
        await this.userRecords.delete(_id)
    }
}