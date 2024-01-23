import { Filter, ObjectId } from 'mongodb';
import { IUser } from '../dataAccess/entities/User';
import { BaseRepository, IBaseRepository } from '../dataAccess/repositories/baseRepository';
import UserModel from '../models/userModel';

export default class UserService {
    private readonly baseRepository:IBaseRepository<IUser>;
    constructor() {
        this.baseRepository = new BaseRepository('users');
    }
    async user(userId: string) {
        const filter:Filter<IUser>={
            _id: new ObjectId(userId)
        };
        return await this.baseRepository.findOne(filter);
    }
    async users(orgId: string) {
        const filter:Filter<IUser>={
            _id: new ObjectId(orgId)
        };
        return await this.baseRepository.find(filter);
    }
    async insertuser(model: UserModel) {
        const user:IUser={
            firstName:model.firstName,
            lastName:model.lastName,
            email: model.email,
            phoneNumber: model.phoneNumber,
        };
        return await this.baseRepository.insertOne(user);
    }

}

