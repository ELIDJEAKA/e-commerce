import { User } from './../types/user';
import { Injectable, HttpException ,HttpStatus} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt'
@Injectable()
export class UserService {
    constructor(@InjectModel('User') private userModel: Model<User>){}

    private satinizeUser(user:User){
        return user.depopulate('password')
    }

    async create(userDTO:any){
        const {username}=userDTO
        const user = await this.userModel.findOne({username})
        if (user){
            throw new HttpException('User already exist ',HttpStatus.BAD_REQUEST)
        }

        const createdUser = new this.userModel(userDTO);
        await createdUser.save()
        return this.satinizeUser(createdUser)
    }

    async findByLogin(userDTO:any){
        const {username,password}=userDTO
        const user = await this.userModel.findOne({username})
        if(!user){
            throw new HttpException('Invalid credentials ',HttpStatus.UNAUTHORIZED)
        }

        if(await bcrypt.compare(password,user.password)){
            return this.satinizeUser(user)
        }else{
            throw new HttpException('Invilid credential ',HttpStatus.UNAUTHORIZED)
        }
    }
}
