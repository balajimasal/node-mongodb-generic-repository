import { ObjectId } from 'mongodb';

export interface IUser
{
    _id?: ObjectId;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    createdAt?: Date;
    createdBy?: ObjectId;
    updatedAt?: Date;
    updatedBy?: ObjectId;
}